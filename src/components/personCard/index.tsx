import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Person } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { PersonContext } from "../../contexts/personContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface ActorCardProps {
  person: Person;
  action: (a: Person) => React.ReactNode;
}

const ActorCard: React.FC<ActorCardProps> = ({ person, action }) => {
  const { favourites } = useContext(PersonContext);
  const isFavourite = favourites.find((id) => id === person.id) ? true : false;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" align="center">
            {person.name}
          </Typography>
        }
      />
      <Link to={`/person/${person.id}`}>
        <CardMedia
          sx={styles.media}
          image={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img
          }
        />
      </Link>
      <CardActions disableSpacing>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            {action(person)}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          ></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ActorCard;
