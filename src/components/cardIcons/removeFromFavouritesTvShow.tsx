import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TvShowContext } from "../../contexts/tvShowContext";
import { BaseTvShowProps } from "../../types/interfaces";

const RemoveFromFavouritesTvShowIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(tvShow);
  };

  return (
    <IconButton
      aria-label="remove from favourites"
      onClick={onUserRequest}
      title="Remove this TV show from your favourites"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesTvShowIcon;
