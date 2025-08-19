import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../types/movies";

const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (_: MouseEvent<HTMLButtonElement>) => {
    context.addToFavourites(movie);
  };
  return (
    <IconButton
      aria-label="add to favourites"
      onClick={onUserSelect}
      title="Add this movie to your favourites"
      type="button"
    >
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
