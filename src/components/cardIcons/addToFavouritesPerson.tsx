import React, { MouseEvent, useContext } from "react";
import { PeopleContext } from "../../contexts/peopleContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Person } from "../../types/interfaces";

const AddToFavouritesPersonIcon: React.FC<Person> = (person) => {
  const context = useContext(PeopleContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(person);
  };
  return (
    <IconButton
      aria-label="add to favourites"
      onClick={onUserSelect}
      title="Add this person to your favourites"
    >
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesPersonIcon;
