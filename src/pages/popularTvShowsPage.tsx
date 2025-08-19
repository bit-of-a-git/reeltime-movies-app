import TvShowListPage from "./tvShowListPage";
import { getPopularTvShows } from "../api/tmdb-api";

const PopularTvShowsPage = () => (
  <TvShowListPage
    title="Popular TV Shows"
    queryKey="popularTvShows"
    fetchFunction={getPopularTvShows}
  />
);

export default PopularTvShowsPage;
