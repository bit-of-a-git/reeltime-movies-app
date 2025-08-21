import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { BaseTvShowProps, TvShowDetailsProps } from "../../types/tvShows";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { TvShowContext } from "../../contexts/tvShowContext";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../contexts/authContext";

const styles = {
  root: {
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TemplateTvShowHeaderProps {
  tvShow: TvShowDetailsProps;
  action: (m: BaseTvShowProps) => React.ReactNode;
}

const TvShowHeader: React.FC<TemplateTvShowHeaderProps> = ({
  tvShow,
  action,
}) => {
  const { favourites, mustWatch } = useContext(TvShowContext);
  const isFavourite = favourites.includes(tvShow.id);
  const isMustWatch = mustWatch.includes(tvShow.id);
  const { currentUser } = useAuth();

  const renderAvatar = () => {
    if (!currentUser) {
      return null;
    }

    if (isFavourite) {
      return (
        <Avatar
          sx={styles.avatar}
          aria-label="Favourite TV Show"
          title="Added to favourite TV shows"
        >
          <FavoriteIcon />
        </Avatar>
      );
    }

    if (isMustWatch) {
      return (
        <Avatar
          sx={styles.avatar}
          aria-label="Must-Watch TV Show"
          title="Added to must-watch TV shows"
        >
          <PlaylistAddIcon />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ ...styles.avatar, bgcolor: "transparent" }}>
        {action(tvShow)}
      </Avatar>
    );
  };

  return (
    <Paper component="div" sx={styles.root}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
          {renderAvatar()}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4" component="h4">
            {tvShow.name}
          </Typography>
          {tvShow.tagline && (
            <Typography variant="h5" component="h5" fontStyle="italic">
              {tvShow.tagline}
            </Typography>
          )}
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
          {tvShow.homepage && (
            <Link
              to={tvShow.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${tvShow.name} homepage`}
              title={`Open ${tvShow.name} homepage`}
            >
              <HomeIcon
                color="primary"
                fontSize="large"
                sx={{ marginRight: "25px" }}
              />
            </Link>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TvShowHeader;
