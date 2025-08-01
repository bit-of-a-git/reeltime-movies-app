import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "../../types/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const isFavourite = favourites.some(
    (fav: { id: number }) => fav.id === movie.id
  );

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
      <Typography variant="h5" component="h3">
        {movie.tagline}
      </Typography>
      <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
        <HomeIcon color="primary" fontSize="large" />
      </a>
    </Paper>
  );
};

export default MovieHeader;
