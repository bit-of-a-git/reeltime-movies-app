import React from "react";
import TvShowListPage from "./tvShowListPage";
import { getOnTheAirTvShows } from "../api/tmdb-api";

const OnTheAirTvShows: React.FC = () => (
  <TvShowListPage
    title="On The Air TV Shows"
    queryKey="onTheAirTvShows"
    fetchFunction={getOnTheAirTvShows}
  />
);

export default OnTheAirTvShows;
