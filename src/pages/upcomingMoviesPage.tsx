import MovieListPage from "./movieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = () => (
  <MovieListPage
    title="Upcoming Movies"
    queryKey="upcomingMovies"
    fetchFunction={getUpcomingMovies}
    action={(movie) => <AddToMustWatchIcon {...movie} />}
  />
);

export default UpcomingMoviesPage;
