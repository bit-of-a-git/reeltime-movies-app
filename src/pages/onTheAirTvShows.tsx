import TvShowListPage from "./tvShowListPage";
import { getOnTheAirTvShows } from "../api/tmdb-api";

const onTheAirTvShows: React.FC = () => (
  <TvShowListPage
    title="On The Air TV Shows"
    queryKey="onTheAirTvShows"
    fetchFunction={getOnTheAirTvShows}
  />
);

export default onTheAirTvShows;
