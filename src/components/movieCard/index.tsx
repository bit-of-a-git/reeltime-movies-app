import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/movies";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAuth } from "../../contexts/authContext";
import { CardActions } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const styles = {
  media: { height: 450, objectFit: "contain" },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
  showFooterActions?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  action,
  showFooterActions,
}) => {
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
        <Avatar sx={styles.avatar} aria-label="Favourite movie">
          <FavoriteIcon />
        </Avatar>
      );
    }

    if (isMustWatch) {
      return (
        <Avatar sx={styles.avatar} aria-label="Must watch movie">
          <PlaylistAddIcon />
        </Avatar>
      );
    }

    return <Avatar sx={{ bgcolor: "transparent" }}>{action(movie)}</Avatar>;
  };

  return (
    <Card>
      <CardHeader
        avatar={renderAvatar()}
        title={
          <Typography variant="h5" component="p" align="center">
            {movie.title}
          </Typography>
        }
        sx={{
          "& .MuiCardHeader-avatar": {
            marginRight: 0,
          },
        }}
      />
      <Link to={`/movies/${movie.id}`}>
        <CardMedia
          component="img"
          sx={styles.media}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
          alt={`${movie.title} poster`}
        />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="inherit" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="inherit" />
              {Math.round(movie.vote_average * 10) / 10}/10
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {showFooterActions && (
        <CardActions
          sx={{
            justifyContent: "space-between",
            px: "8px",
            pt: "0px",
            pb: "4px",
          }}
        >
          {action(movie)}
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
