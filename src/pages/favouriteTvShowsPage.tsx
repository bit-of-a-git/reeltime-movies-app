import React, { useContext } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { TvShowContext } from "../contexts/tvShowContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouritesTvShow";
import WriteReview from "../components/cardIcons/writeReviewTvShow";
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

const FavouriteTvShowsPage: React.FC = () => {
  const { favourites: tvShowIds } = useContext(TvShowContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
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
  const isLoading = favouriteTvShowQueries.find((t) => t.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
  const displayedTvShows = allFavourites ? filterFunction(allFavourites) : [];

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
      {displayedTvShows.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            You have no favourite TV shows yet.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Why not browse and add to your list?
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title="Favourite TV Shows"
          tvShows={displayedTvShows}
          action={(tvShow) => {
            return (
              <>
                <RemoveFromFavourites {...tvShow} />
                <WriteReview {...tvShow} />
              </>
            );
          }}
        />
      )}

      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteTvShowsPage;
