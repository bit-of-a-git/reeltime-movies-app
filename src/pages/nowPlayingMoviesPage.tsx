import React from "react";
import MovieListPage from "./movieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";

const NowPlayingMoviesPage: React.FC = () => (
  <MovieListPage
    title="Now Playing Movies"
    queryKey="nowPlayingMovies"
    fetchFunction={getNowPlayingMovies}
  />
);

export default NowPlayingMoviesPage;
