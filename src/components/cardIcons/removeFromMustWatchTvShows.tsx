import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TvShowContext } from "../../contexts/tvShowContext";
import { BaseTvShowProps } from "../../types/tvShows";

const RemoveFromMustWatchIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowContext);

  const onUserRequest = (_: MouseEvent<HTMLButtonElement>) => {
    context.removeFromMustWatch(tvShow);
  };

  return (
    <IconButton
      aria-label="remove from must-watch list"
      onClick={onUserRequest}
      title="Remove this TV show from your must-watch list"
      sx={{ ml: "auto" }}
      type="button"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
