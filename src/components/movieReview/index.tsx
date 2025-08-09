import React from "react";
import { Review } from "../../types/interfaces";
import { Typography } from "@mui/material";

const MovieReview: React.FC<Review> = (props) => {
  return (
    <>
      <Typography variant="h5" component="h5">
        Review By: {props.author}
      </Typography>
      <Typography variant="body1">{props.content}</Typography>
    </>
  );
};
export default MovieReview;
