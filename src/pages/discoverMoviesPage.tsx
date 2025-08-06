import MovieListPage from "./movieListPage";
import { getDiscoverMovies } from "../api/tmdb-api";

const DiscoverMoviesPage: React.FC = () => (
  <MovieListPage
    title="Discover Movies"
    queryKey="discoverMovies"
    fetchFunction={getDiscoverMovies}
  />
);

export default DiscoverMoviesPage;
