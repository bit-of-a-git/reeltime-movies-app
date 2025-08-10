import React from "react";
import TvShowListPage from "./tvShowListPage";
import { getPopularTvShows } from "../api/tmdb-api";

const PopularTvShowsPage: React.FC = () => (
  <TvShowListPage
    title="Popular TV Shows"
    queryKey="popularTvShows"
    fetchFunction={getPopularTvShows}
  />
);

export default PopularTvShowsPage;
