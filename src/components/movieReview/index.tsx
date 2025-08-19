import React from "react";
import { Review } from "../../types/movies";
import { Typography } from "@mui/material";

const MovieReview: React.FC<Review> = (props) => {
  return (
    <>
      <Typography variant="overline" component="h5">
        Review by: {props.author}
      </Typography>
      <Typography variant="body1" component="p" sx={{ whiteSpace: "pre-wrap" }}>
        {props.content}
      </Typography>
    </>
  );
};
export default MovieReview;
