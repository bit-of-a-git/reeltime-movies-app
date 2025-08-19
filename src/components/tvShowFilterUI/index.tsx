import React, { useState } from "react";
import FilterCard from "../filterCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTvShowProps, TvShowDetailsProps } from "../../types/tvShows";
import SortCard from "../../components/sortCard";
import { Box, Button } from "@mui/material";

export const dateToYear = (dateString: string) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const titleFilter = (
  tvShow: BaseTvShowProps,
  value: string
): boolean => {
  return tvShow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (
  tvShow: BaseTvShowProps | TvShowDetailsProps,
  value: string
): boolean => {
  const genreId = Number(value);
  if (genreId <= 0) return true; // Show all if no valid genre selected
  if ((tvShow as BaseTvShowProps).genre_ids) {
    return (tvShow as BaseTvShowProps).genre_ids?.includes(genreId) ?? true;
  }
  if ((tvShow as TvShowDetailsProps).genres) {
    return (tvShow as TvShowDetailsProps).genres.some((g) => g.id === genreId);
  }
  return false;
};

export const minRatingFilter = (
  tvShow: BaseTvShowProps,
  value: string
): boolean => {
  return tvShow.vote_average >= Number(value);
};

export const yearToFilter = (
  tvShow: BaseTvShowProps,
  value: string
): boolean => {
  return dateToYear(tvShow.first_air_date) <= Number(value);
};

export const yearFromFilter = (
  tvShow: BaseTvShowProps,
  value: string
): boolean => {
  return dateToYear(tvShow.first_air_date) >= Number(value);
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface TvShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortChange: (sortOption: string) => void;
  onResetFilters: () => void;
  titleFilter: string;
  genreFilter: string;
  minRatingFilter: string;
  yearToFilter: string;
  yearFromFilter: string;
}

const TvShowFilterUI: React.FC<TvShowFilterUIProps> = ({
  onFilterValuesChange,
  onSortChange,
  onResetFilters,
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("none");

  const handleSortChange = (sortOption: string) => {
    onSortChange(sortOption);
    setSortOption(sortOption);
  };

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
        aria-label="Open filter and sort options"
      >
        Filter/Sort
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        aria-label="filter-sort-drawer"
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          minRatingFilter={minRatingFilter}
          yearToFilter={yearToFilter}
          yearFromFilter={yearFromFilter}
        />
        <SortCard sortOption={sortOption} onSortChange={handleSortChange} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            onClick={onResetFilters}
          >
            Reset
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default TvShowFilterUI;
