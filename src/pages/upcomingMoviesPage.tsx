import MovieListPage from "./movieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage: React.FC = () => (
  <MovieListPage
    title="Upcoming Movies"
    queryKey="upcomingMovies"
    fetchFunction={getUpcomingMovies}
  />
);

export default UpcomingMoviesPage;
