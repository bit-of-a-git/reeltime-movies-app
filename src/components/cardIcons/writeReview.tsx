import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const WriteReviewIcon: React.FC<BaseMovieProps> = (movie) => {
  return (
    <Link
      to={"/reviews/form"}
      state={{
        movieId: movie.id,
      }}
    >
      <IconButton
        aria-label="write review of movie"
        title="Write a review of this movie"
      >
        <RateReviewIcon color="primary" fontSize="large" />
      </IconButton>
    </Link>
  );
};

export default WriteReviewIcon;
