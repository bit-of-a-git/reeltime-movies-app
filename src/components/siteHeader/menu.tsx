import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";

// To implement this menu drawer, I referenced and took code from https://github.com/ki321g/MovieAPP
// modifying it to suit my app and desired functionality

interface MenuProps {
  handleDrawerToggle: () => void;
}

const Menu: React.FC<MenuProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState({
    movies: false,
    favourites: false,
  });

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleMenuSelect = (pageURL: string) => {
    handleDrawerToggle();

    for (const section in openSections) {
      setOpenSections((prevState) => ({
        ...prevState,
        [section]: false,
      }));
    }

    navigate(pageURL);
  };

  const menuOptions = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    {
      label: "Movies",
      icon: <MovieIcon />,
      children: [
        { label: "Discover", path: "/" },
        { label: "Popular", path: "/movies/popular" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Top Rated", path: "/movies/top-rated" },
        { label: "Now Playing", path: "/movies/now-playing" },
      ],
    },
    {
      label: "TV Shows",
      icon: <LiveTvIcon />,
      children: [
        { label: "Discover", path: "/tv/discover" },
        { label: "Popular", path: "/tv/popular" },
        { label: "Airing Today", path: "/tv/airing-today" },
        { label: "Top Rated", path: "/tv/top-rated" },
        { label: "On the Air", path: "/tv/on-the-air" },
      ],
    },
    ...(auth.currentUser
      ? [
          {
            label: "Favourites",
            icon: <FavoriteIcon />,
            children: [
              { label: "Movies", path: "/movies/favourites" },
              { label: "TV Shows", path: "/tv/favourites" },
              { label: "Actors", path: "/actors/favourites" },
            ],
          },
        ]
      : []),
    ...(auth.currentUser
      ? [
          {
            label: "Fantasy Movies",
            icon: <AutoAwesomeIcon />,
            path: "/my-fantasy-movies",
          },
          {
            label: "Must Watch",
            icon: <PlaylistAddIcon />,
            path: "/my-must-watch-movies",
          },
        ]
      : []),
  ];

  return (
    <List>
      {menuOptions.map((opt) =>
        opt.children ? (
          <>
            <Accordion
              key={opt.label}
              disableGutters
              expanded={expanded === opt.label}
              onChange={handleChange(opt.label)}
              elevation={0}
              sx={{
                backgroundColor: "primary.light",
                // https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
                color: "primary.contrastText",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMore sx={{ color: "primary.contrastText" }} />
                }
                aria-controls={`${opt.label}-content`}
                id={`${opt.label}-header`}
                sx={{ cursor: "pointer" }}
              >
                {opt.icon}
                <ListItemText primary={opt.label} sx={{ pl: 2 }} />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <List component="div" disablePadding>
                  {opt.children.map((child) => (
                    <ListItem
                      key={child.label}
                      onClick={() => {
                        handleMenuSelect(child.path);
                      }}
                      sx={{
                        cursor: "pointer",
                        pl: 5,
                        "&:hover": {
                          backgroundColor: "info.dark",
                        },
                      }}
                    >
                      <ListItemText primary={child.label} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider
              sx={{
                my: 1,
                borderColor: "#fff",
                backgroundColor: "#fff",
              }}
            />
          </>
        ) : (
          <>
            <ListItem
              onClick={() => handleMenuSelect(opt.path!)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "info.dark",
                },
              }}
            >
              {opt.icon}
              <ListItemText primary={opt.label} sx={{ pl: 2 }} />
            </ListItem>
            <Divider
              sx={{
                my: 1,
                borderColor: "primary.contrastText",
                backgroundColor: "primary.contrastText",
              }}
            />
          </>
        )
      )}
    </List>
  );
};

export default Menu;
