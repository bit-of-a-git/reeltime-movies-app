import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/movies";

const AddToMustWatchIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (_: MouseEvent<HTMLButtonElement>) => {
    context.addToMustWatch(movie);
  };
  return (
    <IconButton
      aria-label="add to must-watch"
      onClick={onUserSelect}
      title="Add this movie to your must-watch list"
      type="button"
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
