import TvShowListPage from "./tvShowListPage";
import { getOnTheAirTvShows } from "../api/tmdb-api";

const OnTheAirTvShowsPage = () => (
  <TvShowListPage
    title="On The Air TV Shows"
    queryKey="onTheAirTvShows"
    fetchFunction={getOnTheAirTvShows}
  />
);

export default OnTheAirTvShowsPage;
