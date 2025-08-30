import { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import AddToFavouritesIcon from "../cardIcons/addToFavouritesPerson";
import { PeopleContext } from "../../contexts/peopleContext";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BasePersonProps as Person } from "../../types/people";
import { Link } from "react-router-dom";
import img from "../../images/no-image-available.jpg";
import { useAuth } from "../../contexts/authContext";

const styles = {
  media: {
    margin: "0 20px",
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

// https://dev.to/mhmdjaw/an-alternative-to-the-javascript-switch-statement-1kah
const getGender = (genderId: number) => {
  const genderMap: { [key: number]: string } = {
    0: "Not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  const genderLabel = genderMap[genderId] ?? "Unknown";
  return genderLabel;
};

export default function PersonalInfo({ person }: { person: Person }) {
  const { favourites } = useContext(PeopleContext);
  const isFavourite = favourites.includes(person.id);
  const { currentUser } = useAuth();

  const renderAvatar = () => {
    if (!currentUser) {
      return null;
    }

    if (isFavourite) {
      return (
        <Avatar sx={styles.avatar} aria-label="Favourite Person">
          <FavoriteIcon />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: "transparent" }}>
        <AddToFavouritesIcon {...person} />
      </Avatar>
    );
  };

  return (
    <Card elevation={5}>
      <CardHeader
        avatar={renderAvatar()}
        title={
          <Typography variant="h5" align="center">
            {person.name}
          </Typography>
        }
        sx={{
          "& .MuiCardHeader-avatar": {
            marginRight: 0,
          },
        }}
      />
      <Box sx={styles.media}>
        <CardMedia
          component="img"
          image={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : img
          }
          style={{
            maxWidth: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "20px",
          }}
          alt={person.name}
        />
      </Box>
      <CardContent>
        <Typography variant="body1" paddingTop="10px">
          <strong>Gender</strong>
        </Typography>
        <Typography variant="body1">{getGender(person.gender)}</Typography>
        <Typography variant="body1" paddingTop="10px">
          <strong>Known For</strong>
        </Typography>
        <Typography variant="body1">{person.known_for_department}</Typography>
        {person.birthday && (
          <>
            <Typography variant="body1" paddingTop="10px">
              <strong>Date of Birth</strong>
            </Typography>
            <Typography variant="body1">{person.birthday}</Typography>
          </>
        )}
        {person.place_of_birth && (
          <>
            <Typography variant="body1" paddingTop="10px">
              <strong>Place of Birth</strong>
            </Typography>
            <Typography variant="body1">{person.place_of_birth}</Typography>
          </>
        )}
        {person.deathday && (
          <>
            <Typography variant="body1" paddingTop="10px">
              <strong>Death Date</strong>
            </Typography>
            <Typography variant="body1">{person.deathday}</Typography>
          </>
        )}
        {person.homepage && (
          <>
            <Typography variant="body1" paddingTop="10px">
              <strong>Website</strong>
            </Typography>
            <Typography variant="body1">
              {/* https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable */}
              <Link
                to={person.homepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${person.name}'s homepage`}
                title={`Open ${person.name}'s homepage`}
              >
                {person.homepage}
              </Link>
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
