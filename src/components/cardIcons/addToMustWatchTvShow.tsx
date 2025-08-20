import React, { MouseEvent, useContext } from "react";
import { TvShowContext } from "../../contexts/tvShowContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseTvShowProps } from "../../types/tvShows";

const AddToMustWatchIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowContext);

  const onUserSelect = (_: MouseEvent<HTMLButtonElement>) => {
    context.addToMustWatch(tvShow);
  };
  return (
    <IconButton
      aria-label="add to must-watch"
      onClick={onUserSelect}
      title="Add this TV show to your must-watch list"
      type="button"
    >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
