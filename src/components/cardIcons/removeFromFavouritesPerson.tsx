import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PeopleContext } from "../../contexts/peopleContext";
import { BasePersonProps as Person } from "../../types/people";

const RemoveFromFavouritesPersonIcon: React.FC<Person> = (person) => {
  const context = useContext(PeopleContext);

  const onUserRequest = (_: MouseEvent<HTMLButtonElement>) => {
    context.removeFromFavourites(person);
  };

  return (
    <IconButton
      aria-label="remove from favourites"
      onClick={onUserRequest}
      title="Remove this person from your favourites"
      sx={{ ml: "auto" }}
      type="button"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesPersonIcon;
