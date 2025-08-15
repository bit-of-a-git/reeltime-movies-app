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
import { CardActions } from "@mui/material";

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
  showFooterActions?: boolean;
}

const TvShowCard: React.FC<TvShowCardProps> = ({
  tvShow,
  action,
  showFooterActions,
}) => {
  const { favourites, mustWatch } = useContext(TvShowContext);
  const isFavourite = favourites.includes(tvShow.id);
  const isMustWatch = mustWatch.includes(tvShow.id);

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar} aria-label="Favourite TV show">
              <FavoriteIcon />
            </Avatar>
          ) : isMustWatch ? (
            <Avatar sx={styles.avatar} aria-label="Must-watch TV show">
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
          <Grid item xs={9}>
            <Typography variant="body1" component="p">
              <CalendarIcon fontSize="inherit" />
              First aired: {tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography variant="body1" component="p">
              {tvShow.vote_average > 0 ? (
                <>
                  <StarRateIcon fontSize="inherit" />
                  {tvShow.vote_average}
                </>
              ) : (
                "N/A"
              )}
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
          {action(tvShow)}
        </CardActions>
      )}
    </Card>
  );
};

export default TvShowCard;
