import TvShowListPage from "./tvShowListPage";
import { getDiscoverTvShows } from "../api/tmdb-api";

const DiscoverTvShowsPage = () => (
  <TvShowListPage
    title="Discover TV Shows"
    queryKey="discoverTvShows"
    fetchFunction={getDiscoverTvShows}
  />
);

export default DiscoverTvShowsPage;
