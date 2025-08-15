import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TvShowDetailsProps, Video } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TvShowReviews from "../tvShowReviews";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import CameraIndoorOutlinedIcon from "@mui/icons-material/CameraIndoorOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Modal from "@mui/material/Modal";
import PublicIcon from "@mui/icons-material/Public";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TvIcon from "@mui/icons-material/Tv";
import CreateIcon from "@mui/icons-material/Create";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    marginRight: 0.5,
  },
  fab: {
    position: "fixed",
    top: 75,
    right: 2,
  },
  genericBox: {
    maxWidth: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  genericCard: {
    display: "inline-block",
    margin: "0 10px",
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0)",
    },
  },
  similarTvShowImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  creditsImage: {
    borderRadius: "8px",
  },
  cardTitle: {
    marginBottom: "5px",
  },
  cardSubtitle: {},
};

interface TvShowDetailsComponentProps {
  tvShow: TvShowDetailsProps;
  trailer?: Video;
}

const TvShowDetails: React.FC<TvShowDetailsComponentProps> = ({
  tvShow,
  trailer,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  // https://mui.com/material-ui/react-accordion/
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography variant="h5" component="h5" gutterBottom>
        Overview
      </Typography>
      <Typography>{tvShow.overview}</Typography>
      <Box component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Box>
      <Box component="ul" sx={styles.chipSet}>
        {tvShow.origin_country[0] && (
          <Chip icon={<PublicIcon />} label={`${tvShow.origin_country}`} />
        )}
        {tvShow.episode_run_time[0] && (
          <Chip
            icon={<AccessTimeIcon />}
            label={`${tvShow.episode_run_time[0]} min`}
          />
        )}
        {tvShow.number_of_seasons && (
          <Chip
            icon={<TvIcon />}
            label={`${tvShow.number_of_seasons} seasons`}
          />
        )}
        {tvShow.number_of_episodes && (
          <Chip
            icon={<PlaylistAddIcon />}
            label={`${tvShow.number_of_episodes} episodes`}
          />
        )}
        <Chip
          icon={<StarRate />}
          label={`${tvShow.vote_average}/10 (${tvShow.vote_count} ratings)`}
        />
        {tvShow.first_air_date && (
          <Chip
            icon={<CalendarIcon fontSize="small" />}
            label={`${tvShow.first_air_date}`}
          />
        )}
      </Box>
      <Box sx={styles.chipSet}>
        {trailer && (
          <>
            <Fab
              color="primary"
              variant="extended"
              onClick={() => setTrailerOpen(true)}
            >
              <YouTubeIcon fontSize="large" />
              Watch Trailer
            </Fab>
            <Modal open={trailerOpen} onClose={() => setTrailerOpen(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </Box>
            </Modal>
          </>
        )}
      </Box>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <TvShowReviews {...tvShow} />
      </Drawer>
      <>
        {tvShow.credits.cast.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="cast-content"
              id="cast-header"
            >
              <TheaterComedyOutlinedIcon />
              <Typography variant="h5">Cast</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.genericBox}>
                {tvShow.credits.cast.map((actor) => (
                  <Link key={actor.id} to={`/person/${actor.id}`}>
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                      >
                        {actor.name}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "/no-image-available.jpg"
                        }
                        alt={actor.name}
                        style={styles.creditsImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {actor.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
        {tvShow.created_by.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="creators-content"
              id="creators-header"
            >
              <CreateIcon />
              <Typography variant="h5">Creators</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.genericBox}>
                {tvShow.created_by.map((creator) => (
                  <Link key={creator.id} to={`/person/${creator.id}`}>
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                      >
                        {creator.name}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={
                          creator.profile_path
                            ? `https://image.tmdb.org/t/p/w200${creator.profile_path}`
                            : "/no-image-available.jpg"
                        }
                        alt={creator.name}
                        style={styles.creditsImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {creator.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
        {tvShow.credits.crew.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="crew-content"
              id="crew-header"
            >
              <CameraIndoorOutlinedIcon />
              <Typography variant="h5">Crew</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.genericBox}>
                {tvShow.credits.crew.map((crewMember) => (
                  <Link
                    key={crewMember.credit_id}
                    to={`/person/${crewMember.id}`}
                  >
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                      >
                        {crewMember.name}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={
                          crewMember.profile_path
                            ? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
                            : "/no-image-available.jpg"
                        }
                        alt={crewMember.name}
                        style={styles.creditsImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {crewMember.job}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
        {tvShow.similar.results.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="similar-tv-content"
              id="similar-tv-header"
            >
              <LocalMoviesIcon />
              <Typography variant="h5">Similar TV Shows</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.genericBox}>
                {tvShow.similar.results.map((tvShow) => (
                  <Link key={tvShow.id} to={`/tv/${tvShow.id}`}>
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                        noWrap
                      >
                        {tvShow.name}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={
                          tvShow.poster_path
                            ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`
                            : "/no-image-available.jpg"
                        }
                        alt={tvShow.name}
                        sx={styles.similarTvShowImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {tvShow.vote_average}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </>
    </>
  );
};
export default TvShowDetails;
