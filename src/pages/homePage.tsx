import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
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

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "discover",
    getMovies
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
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

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
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
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={changeSortOption}
      />
    </>
  );
};
export default HomePage;
