import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "../../types/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const { favourites } = useContext(MoviesContext);
  const isFavourite = favourites.includes(movie.id);

  return (
    <Paper component="div" sx={styles.root}>
      {isFavourite && (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      )}
      <Typography variant="h4" component="h3">
        {movie.title}
      </Typography>
      {movie.tagline && (
        <Typography variant="h5" component="h3">
          {movie.tagline}
        </Typography>
      )}
      {movie.homepage && (
        <Link
          to={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${movie.title} homepage`}
          title={`Open ${movie.title} homepage`}
        >
          <HomeIcon color="primary" fontSize="large" />
        </Link>
      )}
    </Paper>
  );
};

export default MovieHeader;
