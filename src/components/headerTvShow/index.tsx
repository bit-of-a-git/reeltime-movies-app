import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { TvShowDetailsProps } from "../../types/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TvShowContext } from "../../contexts/tvShowContext";
import { Link } from "react-router-dom";

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

const TvShowHeader: React.FC<TvShowDetailsProps> = (tvShow) => {
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
        <Link
          to={tvShow.homepage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${tvShow.name} homepage`}
          title={`Open ${tvShow.name} homepage`}
        >
          <HomeIcon color="primary" fontSize="large" />
        </Link>
      )}
    </Paper>
  );
};

export default TvShowHeader;
