import MovieListPage from "./movieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesMovie";

const TopRatedMoviesPage = () => (
  <MovieListPage
    title="Top Rated Movies"
    queryKey="topRatedMovies"
    fetchFunction={getTopRatedMovies}
    action={(movie) => <AddToFavouritesIcon {...movie} />}
  />
);

export default TopRatedMoviesPage;
