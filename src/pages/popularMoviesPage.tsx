import React from "react";
import MovieListPage from "./movieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesMovie";

const PopularMoviesPage: React.FC = () => (
  <MovieListPage
    title="Popular Movies"
    queryKey="popularMovies"
    fetchFunction={getPopularMovies}
    action={(movie) => <AddToFavouritesIcon {...movie} />}
  />
);

export default PopularMoviesPage;
