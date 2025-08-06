import React from "react";
import MovieListPage from "./movieListPage";
import { getPopularMovies } from "../api/tmdb-api";

const PopularMoviesPage: React.FC = () => (
  <MovieListPage
    title="Popular Movies"
    queryKey="popularMovies"
    fetchFunction={getPopularMovies}
  />
);

export default PopularMoviesPage;
