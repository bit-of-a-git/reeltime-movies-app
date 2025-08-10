import React from "react";
import MovieListPage from "./movieListPage";
import { getDiscoverMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesMovie";

const DiscoverMoviesPage: React.FC = () => (
  <MovieListPage
    title="Discover Movies"
    queryKey="discoverMovies"
    fetchFunction={getDiscoverMovies}
    action={(movie) => <AddToFavouritesIcon {...movie} />}
  />
);

export default DiscoverMoviesPage;
