import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps, Video } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import CameraIndoorOutlinedIcon from "@mui/icons-material/CameraIndoorOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Modal from "@mui/material/Modal";

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
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
  genericBox: {
    maxWidth: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    paddingY: "10px",
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
  similarMovieImage: {
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

interface MovieDetailsComponentProps {
  movie: MovieDetailsProps;
  trailer?: Video;
}

const MovieDetails: React.FC<MovieDetailsComponentProps> = ({
  movie,
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

  const ids = new Set();
  const uniqueCrewList = movie.credits.crew.filter(
    ({ id }) => !ids.has(id) && ids.add(id)
  );
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        {movie.revenue > 0 && (
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
        )}
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average}/10 (${movie.vote_count} ratings)`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      {/* For the trailer functionality and modal, I referenced and took code from https://github.com/ki321g/MovieAPP */}
      <Paper sx={styles.chipSet}>
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
      </Paper>
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
        <MovieReviews {...movie} />
      </Drawer>
      <>
        <Accordion
          disableGutters
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
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
              {movie.credits.cast.map((actor) => (
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
                      alt={movie.title}
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
        {movie.credits.crew.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
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
                {uniqueCrewList.map((crewMember) => (
                  <Link key={crewMember.id} to={`/person/${crewMember.id}`}>
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
                        alt={movie.title}
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
        {movie.similar.results.length > 0 && (
          <Accordion
            disableGutters
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <LocalMoviesIcon />
              <Typography variant="h5">Similar Movies</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* I referred to the movie detail page of https://github.com/ki321g/MovieAPP, modifying the code for similar movies instead of cast 
            I combined this with the accordion feature I saw in https://github.com/eoinfennessy/movies-app/ */}
              <Box sx={styles.genericBox}>
                {movie.similar.results.map((movie) => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                      >
                        {movie.title}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        sx={styles.similarMovieImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {movie.vote_average}
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
export default MovieDetails;
