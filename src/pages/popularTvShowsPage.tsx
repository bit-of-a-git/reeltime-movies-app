import React from "react";
import TvShowListPage from "./tvShowListPage";
import { getPopularTvShows } from "../api/tmdb-api";

const PopularTVShowsPage: React.FC = () => (
  <TvShowListPage
    title="Popular TV Shows"
    queryKey="popularTvShows"
    fetchFunction={getPopularTvShows}
  />
);

export default PopularTVShowsPage;
