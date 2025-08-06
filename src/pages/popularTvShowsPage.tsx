import React, { useState } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { getPopularTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
} from "../components/tvShowFilterUI";
import { TvShowApiResults, BaseTvShowProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesTvShow";

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

const PopularTvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<TvShowApiResults, Error>(
    ["popularTvShows", page],
    () => getPopularTvShows(page),
    { keepPreviousData: true }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    minRatingFiltering,
    yearToFiltering,
    yearFromFiltering,
  ]);

  const [sortOption, setSortOption] = useState<string>("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string | number) => {
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value } : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const sortFunctions: {
    [key: string]: (a: BaseTvShowProps, b: BaseTvShowProps) => number;
  } = {
    date: (a, b) =>
      new Date(b.first_air_date).getTime() -
      new Date(a.first_air_date).getTime(),
    rating: (a, b) => b.vote_average - a.vote_average,
    popularity: (a, b) => b.popularity - a.popularity,
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
  };

  const tvShows = data ? data.results : [];
  const displayedTvShows = filterFunction(tvShows);

  const changePage = (delta: number) => {
    const newPage = page + delta;
    if (newPage > 0 && newPage <= data.total_pages) {
      setPage(newPage);
    }
  };

  const sortedTvShows =
    sortOption === "none"
      ? displayedTvShows
      : [...displayedTvShows].sort(sortFunctions[sortOption]);

  return (
    <>
      <PageTemplate
        title="Popular TV Shows"
        tvShows={sortedTvShows}
        action={(tvShow: BaseTvShowProps) => {
          return <AddToFavouritesIcon {...tvShow} />;
        }}
        changePage={changePage}
      />
      <TvShowFilterUI
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
export default PopularTvShowsPage;
