import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

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

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page],
    () => getMovies(page),
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
    return <h1>{error.message}</h1>;
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
      <PageTemplate
        title="Discover Movies"
        movies={sortedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
        changePage={changePage}
      />
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
export default HomePage;
