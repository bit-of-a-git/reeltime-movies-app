import TvShowListPage from "./tvShowListPage";
import { getPopularTvShows } from "../api/tmdb-api";

const PopularTVShows: React.FC = () => (
  <TvShowListPage
    title="Popular TV Shows"
    queryKey="popularTvShows"
    fetchFunction={getPopularTvShows}
  />
);

export default PopularTVShows;
