import MovieListPage from "./movieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage: React.FC = () => (
  <MovieListPage
    title="Top Rated Movies"
    queryKey="topRatedMovies"
    fetchFunction={getTopRatedMovies}
  />
);

export default TopRatedMoviesPage;
