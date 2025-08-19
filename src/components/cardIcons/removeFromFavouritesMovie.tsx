import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/movies";

const RemoveFromFavouritesMovieIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(movie);
  };

  return (
    <IconButton
      aria-label="remove from favourites"
      onClick={onUserRequest}
      title="Remove this movie from your favourites"
      sx={{ ml: "auto" }}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesMovieIcon;
