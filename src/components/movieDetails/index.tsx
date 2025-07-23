import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

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
  similarMoviesBox: {
    maxWidth: "100%",
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingY: "10px",
  },
  similarMovieCard: {
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
};

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h5">Similar Movies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* I referred to the movie detail page of https://github.com/ki321g/MovieAPP, modifying the code for similar movies instead of cast 
            I combined this with the accordion feature I saw in https://github.com/eoinfennessy/movies-app/ */}
            <Box sx={styles.similarMoviesBox}>
              {movie.similar.results
                // The below filters out any movie without a profile_path (picture)
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <Card sx={{ ...styles.similarMovieCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.similarMovieTitle}
                      >
                        {movie.title}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={styles.similarMovieImage}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          style={styles.similarMovieInfo}
                        >
                          {movie.vote_average}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </>
    </>
  );
};
export default MovieDetails;
