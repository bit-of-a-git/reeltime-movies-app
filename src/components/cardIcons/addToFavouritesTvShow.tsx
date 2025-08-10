import React, { MouseEvent, useContext } from "react";
import { TvShowContext } from "../../contexts/tvShowContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTvShowProps } from "../../types/interfaces";

const AddToFavouritesTvShowIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(tvShow);
  };
  return (
    <IconButton
      aria-label="add to favourites"
      onClick={onUserSelect}
      title="Add this TV show to your favourites"
    >
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesTvShowIcon;
