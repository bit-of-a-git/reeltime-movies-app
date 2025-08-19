import TvShowListPage from "./tvShowListPage";
import { getTopRatedTvShows } from "../api/tmdb-api";

const TopRatedTvShowsPage = () => (
  <TvShowListPage
    title="Top Rated TV Shows"
    queryKey="topRatedTvShows"
    fetchFunction={getTopRatedTvShows}
  />
);

export default TopRatedTvShowsPage;
