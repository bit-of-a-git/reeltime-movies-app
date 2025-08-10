import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PeopleContext } from "../../contexts/peopleContext";
import { Person } from "../../types/interfaces";

const RemoveFromFavouritesPersonIcon: React.FC<Person> = (person) => {
  const context = useContext(PeopleContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(person);
  };

  return (
    <IconButton
      aria-label="remove from favourites"
      onClick={onUserRequest}
      title="Remove this person from your favourites"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesPersonIcon;
