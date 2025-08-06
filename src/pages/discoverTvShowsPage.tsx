import React from "react";
import TvShowListPage from "./tvShowListPage";
import { getDiscoverTvShows } from "../api/tmdb-api";

const DiscoverTvShowsPage: React.FC = () => (
  <TvShowListPage
    title="Discover TV Shows"
    queryKey="discoverTvShows"
    fetchFunction={getDiscoverTvShows}
  />
);

export default DiscoverTvShowsPage;
