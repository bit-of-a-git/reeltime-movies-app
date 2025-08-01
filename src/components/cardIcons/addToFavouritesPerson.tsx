import React, { MouseEvent, useContext } from "react";
import { PersonContext } from "../../contexts/personContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Person } from "../../types/interfaces";

const AddToFavouritesPersonIcon: React.FC<Person> = (person) => {
  const context = useContext(PersonContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(person);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesPersonIcon;
