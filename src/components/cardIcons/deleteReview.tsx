import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserReview as Review } from "../../types/movies";

const DeleteReviewIcon: React.FC<Review> = (review) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeReview(review);
  };

  return (
    <IconButton
      aria-label="delete review"
      onClick={onUserRequest}
      title="Delete this review"
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default DeleteReviewIcon;
