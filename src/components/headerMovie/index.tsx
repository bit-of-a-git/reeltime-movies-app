import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { BaseMovieProps, MovieDetailsProps } from "../../types/movies";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
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

interface TemplateMovieHeaderProps {
  movie: MovieDetailsProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieHeader: React.FC<TemplateMovieHeaderProps> = ({ movie, action }) => {
  const { favourites, mustWatch } = useContext(MoviesContext);
  const isFavourite = favourites.includes(movie.id);
  const isMustWatch = mustWatch.includes(movie.id);
  const { currentUser } = useAuth();

  const renderAvatar = () => {
    if (!currentUser) {
      return null;
    }

    if (isFavourite) {
      return (
        <Avatar
          sx={styles.avatar}
          aria-label="Favourite Movie"
          title="Added to favourite movies"
        >
          <FavoriteIcon />
        </Avatar>
      );
    }

    if (isMustWatch) {
      return (
        <Avatar
          sx={styles.avatar}
          aria-label="Must-Watch Movie"
          title="Added to must-watch movies"
        >
          <PlaylistAddIcon />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ ...styles.avatar, bgcolor: "transparent" }}>
        {action(movie)}
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
            {movie.title}
          </Typography>
          {movie.tagline && (
            <Typography variant="h5" component="h5" fontStyle="italic">
              {movie.tagline}
            </Typography>
          )}
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
          {movie.homepage && (
            <Link
              to={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${movie.title} homepage`}
              title={`Open ${movie.title} homepage`}
            >
              <HomeIcon color="primary" fontSize="large" />
            </Link>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieHeader;
