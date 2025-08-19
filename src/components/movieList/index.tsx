import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/movies";

const MovieList: React.FC<BaseMovieListProps> = ({
  movies,
  action,
  showFooterActions = false,
}) => {
  const movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie movie={m} action={action} showFooterActions={showFooterActions} />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
