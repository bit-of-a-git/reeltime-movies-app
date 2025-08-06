import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  minRatingFilter: number;
  yearToFilter: number;
  yearFromFilter: number;
}

const FilterCard: React.FC<FilterCardProps> = ({
  titleFilter,
  genreFilter,
  onUserInput,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  const genresWithAll =
    genres[0]?.name === "All" ? genres : [{ id: "0", name: "All" }, ...genres];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1888 + 1 },
    (_, i) => currentYear - i
  );

  const handleChange = (
    e: SelectChangeEvent,
    type: FilterOption,
    value: string
  ) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleMinRatingChange = (e: SelectChangeEvent) => {
    handleChange(e, "minRating", e.target.value);
  };

  const handleYearToChange = (e: SelectChangeEvent) => {
    handleChange(e, "yearTo", e.target.value);
  };

  const handleYearFromChange = (e: SelectChangeEvent) => {
    handleChange(e, "yearFrom", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FilterAltIcon fontSize="large" />
            Filter
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genresWithAll.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <Select
              sx={styles.formControl}
              label="Minimum Rating"
              id="minimum-rating"
              type="number"
              variant="filled"
              value={minRatingFilter.toString()}
              onChange={handleMinRatingChange}
            >
              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <InputLabel id="year-to-label">Year To</InputLabel>
            <Select
              sx={styles.formControl}
              label="Year To"
              id="year-to"
              type="number"
              variant="filled"
              value={yearToFilter.toString()}
              onChange={handleYearToChange}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <InputLabel id="year-to-label">Year From</InputLabel>
            <Select
              sx={styles.formControl}
              label="Year From"
              id="year-from"
              type="number"
              variant="filled"
              value={yearFromFilter.toString()}
              onChange={handleYearFromChange}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterCard;
