import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";

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

  const handleToggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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
      onClick: () => handleToggleSection("movies"),
      children: [
        { label: "Discover", path: "/" },
        { label: "Upcoming", path: "/movies/upcoming" },
        ...(auth.currentUser
          ? [
              { label: "Must Watch", path: "/my-must-watch-movies" },
              { label: "Fantasy Movies", path: "/my-fantasy-movies" },
            ]
          : []),
      ],
      open: openSections.movies,
    },
    ...(auth.currentUser
      ? [
          {
            label: "Favourites",
            icon: <FavoriteIcon />,
            onClick: () => handleToggleSection("favourites"),
            children: [
              { label: "Movies", path: "/movies/favourites" },
              { label: "Actors", path: "/actors/favourites" },
            ],
            open: openSections.favourites,
          },
        ]
      : []),
    ...(auth.currentUser
      ? [
          { label: "Fantasy Movies", path: "/my-fantasy-movies" },
          { label: "Must Watch", path: "/my-must-watch-movies" },
        ]
      : []),
  ];

  return (
    <List>
      {menuOptions.map((opt) => (
        <React.Fragment key={opt.label}>
          <ListItem
            onClick={
              opt.onClick ? opt.onClick : () => handleMenuSelect(opt.path!)
            }
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "info.dark",
              },
            }}
            aria-expanded={opt.children ? opt.open : undefined}
          >
            {opt.icon}
            <ListItemText primary={opt.label} sx={{ pl: 2 }} />
            {opt.children ? opt.open ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItem>
          <Divider
            sx={{
              my: 1,
              borderColor: "#fff",
              backgroundColor: "#fff",
            }}
          />
          {opt.children && (
            <Collapse in={opt.open} timeout="auto" unmountOnExit>
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
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Menu;
