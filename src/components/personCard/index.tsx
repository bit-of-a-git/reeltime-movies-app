import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import img from "../../images/film-poster-placeholder.png";
import { Person } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { PeopleContext } from "../../contexts/peopleContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface PersonCardProps {
  person: Person;
  action: (a: Person) => React.ReactNode;
  showFooterActions?: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  action,
  showFooterActions,
}) => {
  const { favourites } = useContext(PeopleContext);
  const isFavourite = favourites.includes(person.id);

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
      <Link
        to={`/person/${person.id}`}
        aria-label={`View details for ${person.name}`}
      >
        <CardMedia
          component="img"
          sx={styles.media}
          image={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img
          }
          alt={`${person.name} profile image`}
        />
      </Link>
      {showFooterActions && (
        <CardActions
          sx={{
            justifyContent: "space-between",
            px: "8px",
            pt: "0px",
            pb: "4px",
          }}
        >
          {action(person)}
        </CardActions>
      )}
    </Card>
  );
};

export default PersonCard;
