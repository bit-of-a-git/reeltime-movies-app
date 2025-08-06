import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { BaseTvShowProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { TvShowContext } from "../../contexts/tvShowContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TvShowCardProps {
  tvShow: BaseTvShowProps;
  action: (t: BaseTvShowProps) => React.ReactNode;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ tvShow, action }) => {
  const { favourites, mustWatch } = useContext(TvShowContext);
  const isFavourite = favourites.find((id) => id === tvShow.id) ? true : false;
  const isMustWatch = mustWatch.find((id) => id === tvShow.id) ? true : false;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : isMustWatch ? (
            <Avatar sx={styles.avatar}>
              <AddToQueueIcon />
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "transparent" }}>{action(tvShow)}</Avatar>
          )
        }
        title={
          <Typography variant="h5" component="p" align="center">
            {tvShow.name}
          </Typography>
        }
      />
      <Link to={`/tv/${tvShow.id}`}>
        <CardMedia
          component="img"
          sx={styles.media}
          image={
            tvShow.poster_path
              ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
              : img
          }
          alt={`${tvShow.name} poster`}
        />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography variant="h6" component="p">
              {tvShow.vote_average} <StarRateIcon fontSize="small" />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TvShowCard;
