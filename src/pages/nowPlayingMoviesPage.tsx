import React from "react";
import MovieListPage from "./movieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesMovie";

const NowPlayingMoviesPage: React.FC = () => (
  <MovieListPage
    title="Now Playing Movies"
    queryKey="nowPlayingMovies"
    fetchFunction={getNowPlayingMovies}
    action={(movie) => <AddToFavouritesIcon {...movie} />}
  />
);

export default NowPlayingMoviesPage;
