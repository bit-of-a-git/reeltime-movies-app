import React from "react";
import TvShowListPage from "./tvShowListPage";
import { getTopRatedTvShows } from "../api/tmdb-api";

const TopRatedTvShowsPage: React.FC = () => (
  <TvShowListPage
    title="Top Rated TV Shows"
    queryKey="topRatedTvShows"
    fetchFunction={getTopRatedTvShows}
  />
);

export default TopRatedTvShowsPage;
