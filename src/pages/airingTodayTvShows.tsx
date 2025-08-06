import TvShowListPage from "./tvShowListPage";
import { getAiringTodayTvShows } from "../api/tmdb-api";

const AiringTodayTvShowsPage: React.FC = () => (
  <TvShowListPage
    title="TV Shows Airing Today"
    queryKey="airingTodayTvShows"
    fetchFunction={getAiringTodayTvShows}
  />
);

export default AiringTodayTvShowsPage;
