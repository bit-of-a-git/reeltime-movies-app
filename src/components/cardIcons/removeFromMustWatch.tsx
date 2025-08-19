import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/movies";

const RemoveFromMustWatchIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (_: MouseEvent<HTMLButtonElement>) => {
    context.removeFromMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="remove from must-watch list"
      onClick={onUserRequest}
      title="Remove this movie from your must-watch list"
      sx={{ ml: "auto" }}
      type="button"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
