import React, { ChangeEvent, useMemo } from "react";
import { FilterOption, GenreData } from "../../types/common";
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
  minRatingFilter: string;
  yearToFilter: string;
  yearFromFilter: string;
}

const FilterCard: React.FC<FilterCardProps> = ({
  titleFilter,
  genreFilter,
  onUserInput,
  minRatingFilter,
  yearToFilter,
  yearFromFilter,
}) => {
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 1888 + 1 },
      (_, i) => currentYear - i
    );
  }, []);

  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }
  const genres = data?.genres || [];
  const genresWithAll =
    genres[0]?.name === "All" ? genres : [{ id: 0, name: "All" }, ...genres];

  const handleChange = (type: FilterOption, value: string) => {
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange("genre", e.target.value);
  };

  const handleMinRatingChange = (e: SelectChangeEvent) => {
    handleChange("minRating", e.target.value);
  };

  const handleYearToChange = (e: SelectChangeEvent) => {
    handleChange("yearTo", e.target.value);
  };

  const handleYearFromChange = (e: SelectChangeEvent) => {
    handleChange("yearFrom", e.target.value);
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
              label="Genre"
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
            <InputLabel id="minimum-rating-label">Minimum Rating</InputLabel>
            <Select
              labelId="minimum-rating-label"
              label="Minimum Rating"
              id="minimum-rating"
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
            <InputLabel id="year-to-label" htmlFor="year-to">
              Year To
            </InputLabel>
            <Select
              labelId="year-to-label"
              label="Year To"
              id="year-to"
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
            <InputLabel id="year-from-label" htmlFor="year-from">
              Year From
            </InputLabel>
            <Select
              labelId="year-from-label"
              label="Year From"
              id="year-from"
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
