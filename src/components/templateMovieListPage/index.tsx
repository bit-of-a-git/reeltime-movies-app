import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({
  movies,
  title,
  action,
  changePage,
  showFooterActions = false,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} />
      </Grid>
      <Grid item container spacing={2.5} xs={12}>
        <MovieList
          action={action}
          movies={movies}
          showFooterActions={showFooterActions}
        ></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPageTemplate;
