import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
} from "../components/movieFilterUI";
import { MovieApiResults, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { Box, Typography } from "@mui/material";
import { usePageTitle } from "../hooks/usePageTitle";

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

interface MovieListPageProps {
  title: string;
  queryKey: string;
  fetchFunction: (page: number) => Promise<MovieApiResults>;
  action: (movie: BaseMovieProps) => React.ReactNode;
}

const MovieListPage: React.FC<MovieListPageProps> = ({
  title,
  queryKey,
  fetchFunction,
  action,
}) => {
  const [page, setPage] = useState(1);

  usePageTitle(title);

  const { data, error, isLoading, isError } = useQuery<MovieApiResults, Error>(
    [queryKey, page],
    () => fetchFunction(page),
    { keepPreviousData: true }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    minRatingFiltering,
    yearToFiltering,
    yearFromFiltering,
  ]);

  // Referred to https://github.com/ki321g/MovieAPP for sort movies logic
  // Changed by integrating sort into MovieFilterUI, additionally changing sort functions
  const [sortOption, setSortOption] = useState<string>("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }

  // Loops through the filterValues array, checking if the filter's name matches the type provided
  // If so, it creates a new filter object. If not, it leaves the filter unchanged. Produces a new
  // array where only the target filter has its value updated.
  const changeFilterValues = (type: string, value: string | number) => {
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );
    setFilterValues(updatedFilterSet);
  };

  // Using the sortOption string, this determines which sort function should be used to sort the movies
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

  const handleResetFilters = () => {
    setFilterValues([
      { ...titleFiltering },
      { ...genreFiltering },
      { ...minRatingFiltering },
      { ...yearToFiltering },
      { ...yearFromFiltering },
    ]);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  // I referred to https://github.com/eoinfennessy/movies-app/ for the pagination
  const changePage = (delta: number) => {
    const newPage = page + delta;
    if (newPage > 0 && newPage <= data.total_pages) {
      setPage(newPage);
    }
  };

  // If sortOption is none, returns displayedMovies as is. Otherwise sorts displayedMovies
  // using the function found for the sortOption key.
  const sortedMovies =
    sortOption === "none"
      ? displayedMovies
      : [...displayedMovies].sort(sortFunctions[sortOption]);

  return (
    <>
      {sortedMovies.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            No movies match the current filters.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting or clearing your filters.
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title={title}
          movies={sortedMovies}
          action={action}
          changePage={changePage}
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
        onResetFilters={handleResetFilters}
      />
    </>
  );
};
export default MovieListPage;
