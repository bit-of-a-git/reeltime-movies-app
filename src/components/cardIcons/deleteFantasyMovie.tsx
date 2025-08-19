import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

interface DeleteFantasyMovieIconProps {
  index: number;
}

const DeleteFantasyMovieIcon: React.FC<DeleteFantasyMovieIconProps> = ({
  index,
}) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (_: MouseEvent<HTMLButtonElement>) => {
    context.removeFantasyMovie(index);
  };

  return (
    <IconButton
      aria-label="delete fantasy movie"
      onClick={onUserRequest}
      title="Delete this movie"
      type="button"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default DeleteFantasyMovieIcon;
