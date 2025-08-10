import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouritesMovie";
import WriteReview from "../components/cardIcons/writeReview";
import { Typography, Box } from "@mui/material";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites ? filterFunction(allFavourites) : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      {displayedMovies.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            {allFavourites.length === 0
              ? "You have no favourite movies yet."
              : "No movies match the current filters."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {allFavourites.length === 0
              ? "Why not browse and add to your list?"
              : "Try adjusting or clearing your filters."}
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title="Favourite Movies"
          movies={displayedMovies}
          action={(movie) => {
            return (
              <>
                <RemoveFromFavourites {...movie} />
                <WriteReview {...movie} />
              </>
            );
          }}
        />
      )}

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
