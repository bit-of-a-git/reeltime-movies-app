import { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
} from "../components/movieFilterUI";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
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

const minRatingFiltering = {
  name: "minRating",
  value: 0,
  condition: minRatingFilter,
};

const yearToFiltering = {
  name: "yearTo",
  value: new Date().getFullYear(),
  condition: yearToFilter,
};

const yearFromFiltering = {
  name: "yearFrom",
  value: 1888,
  condition: yearFromFilter,
};

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    minRatingFiltering,
    yearToFiltering,
    yearFromFiltering,
  ]);

  // Create an array of queries and run them in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.some((m) => m.isLoading);

  const [sortOption, setSortOption] = useState<string>("none");

  if (isLoading) {
    return <Spinner />;
  }

  const changeFilterValues = (type: string, value: string | number) => {
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const sortFunctions: {
    [key: string]: (a: BaseMovieProps, b: BaseMovieProps) => number;
  } = {
    date: (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    rating: (a, b) => b.vote_average - a.vote_average,
    popularity: (a, b) => b.popularity - a.popularity,
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
  };

  const allMustWatchList = mustWatchMovieQueries.map((q) => q.data);
  const displayedMovies = allMustWatchList
    ? filterFunction(allMustWatchList)
    : [];

  const sortedMovies =
    sortOption === "none"
      ? displayedMovies
      : [...displayedMovies].sort(sortFunctions[sortOption]);

  return (
    <>
      {sortedMovies.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            {allMustWatchList.length === 0
              ? "You have no must-watch movies yet."
              : "No movies match the current filters."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {allMustWatchList.length === 0
              ? "Why not browse and add to your list?"
              : "Try adjusting or clearing your filters."}
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title="Must Watch List"
          movies={sortedMovies}
          showFooterActions={true}
          action={(movie) => {
            return (
              <>
                <RemoveFromMustWatch {...movie} />
              </>
            );
          }}
        />
      )}

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        minRatingFilter={filterValues[2].value}
        yearToFilter={filterValues[3].value}
        yearFromFilter={filterValues[4].value}
        onSortChange={changeSortOption}
      />
    </>
  );
};

export default MustWatchPage;
