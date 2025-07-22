import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";
import SortCard from "../../components/sortMoviesCard";

export const dateToYear = (dateString: string) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const minRatingFilter = (movie: BaseMovieProps, value: number) => {
  return movie.vote_average >= value;
};

export const yearToFilter = (movie: BaseMovieProps, value: number) => {
  return dateToYear(movie.release_date) <= value;
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

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortChange: (sortOption: string) => void;
  titleFilter: string;
  genreFilter: string;
  minRatingFilter: number;
  yearToFilter: number;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  onSortChange,
  titleFilter,
  genreFilter,
  minRatingFilter,
  yearToFilter,
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
      >
        Filter/Sort
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          minRatingFilter={minRatingFilter}
          yearToFilter={yearToFilter}
        />
        <SortCard sortOption={sortOption} onSortChange={handleSortChange} />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;
