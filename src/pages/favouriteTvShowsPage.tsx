import { useContext, useState } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { TvShowContext } from "../contexts/tvShowContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
} from "../components/tvShowFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouritesTvShow";
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

const FavouriteTvShowsPage = () => {
  const { favourites: tvShowIds } = useContext(TvShowContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
    minRatingFiltering,
    yearToFiltering,
    yearFromFiltering,
  ]);

  // Create an array of queries and run them in parallel.
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId],
        queryFn: () => getTvShow(tvShowId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTvShowQueries.some((t) => t.isLoading);

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

  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
  const displayedTvShows = allFavourites ? filterFunction(allFavourites) : [];

  const sortedTvShows =
    sortOption === "none"
      ? displayedTvShows
      : [...displayedTvShows].sort(sortFunctions[sortOption]);

  return (
    <>
      {sortedTvShows.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            {allFavourites.length === 0
              ? "You have no favourite TV shows yet."
              : "No TV shows match the current filters."}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {allFavourites.length === 0
              ? "Why not browse and add to your list?"
              : "Try adjusting or clearing your filters."}
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title="Favourite TV Shows"
          tvShows={sortedTvShows}
          showFooterActions={true}
          action={(tvShow) => {
            return (
              <>
                <RemoveFromFavourites {...tvShow} />
              </>
            );
          }}
        />
      )}

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

export default FavouriteTvShowsPage;
