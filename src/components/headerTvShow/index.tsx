import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { BaseTvShowProps } from "../../types/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TvShowContext } from "../../contexts/tvShowContext";

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

const TvShowHeader: React.FC<BaseTvShowProps> = (tvShow) => {
  const { favourites } = useContext(TvShowContext);
  const isFavourite = favourites.includes(tvShow.id);

  return (
    <Paper component="div" sx={styles.root}>
      {isFavourite && (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      )}
      <Typography variant="h4" component="h3">
        {tvShow.name}
      </Typography>
      {tvShow.tagline && (
        <Typography variant="h5" component="h3">
          {tvShow.tagline}
        </Typography>
      )}
      {tvShow.homepage && (
        <a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">
          <HomeIcon color="primary" fontSize="large" />
        </a>
      )}
    </Paper>
  );
};

export default TvShowHeader;
