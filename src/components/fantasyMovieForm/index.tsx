import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Spinner from "../spinner";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import productionCompanies from "./productionCompanies";
import { FantasyMovieProps, GenreData } from "../../types/interfaces";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import { getGenres } from "../../api/tmdb-api";

const FantasyMovieForm: React.FC = () => {
  const defaultValues = {
    defaultValues: {
      title: "",
      overview: "",
      genres: [],
      releaseDate: null,
      runtime: 0,
      productionCompanies: [],
    },
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FantasyMovieProps>(defaultValues);

  const navigate = useNavigate();
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false);

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
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  const onSubmit: SubmitHandler<FantasyMovieProps> = (movie) => {
    context.addFantasyMovie(movie);
    setOpen(true);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Create a Fantasy Movie
      </Typography>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">Thank you for submitting a movie</Typography>
        </Alert>
      </Snackbar>
      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Movie title is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="title"
              label="Title"
              autoFocus
            />
          )}
        />
        {errors.title && (
          <Typography variant="h6" component="p">
            {errors.title.message}
          </Typography>
        )}

        <Controller
          name="overview"
          control={control}
          rules={{
            required: "Overview cannot be empty.",
            minLength: { value: 10, message: "Overview is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Overview"
              id="review"
              multiline
              minRows={5}
            />
          )}
        />
        {errors.overview && (
          <Typography variant="h6" component="p">
            {errors.overview.message}
          </Typography>
        )}

        {/* Referred to https://github.com/eoinfennessy/movies-app/ here */}
        <InputLabel id="genre-label">Genre(s)</InputLabel>
        <Controller
          control={control}
          name="genres"
          rules={{ required: "Genre is required" }}
          // defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              id="genre-select"
              value={value}
              label="Genre Select"
              multiple
              onChange={onChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.genres && (
          <Typography variant="h6" component="p">
            {errors.genres.message}
          </Typography>
        )}

        <InputLabel id="date-picker-label">Release Date</InputLabel>
        <Controller
          control={control}
          name="releaseDate"
          rules={{ required: "Release date is required" }}
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {errors.releaseDate && (
          <Typography variant="h6" component="p">
            {errors.releaseDate.message}
          </Typography>
        )}

        <Controller
          name="runtime"
          control={control}
          rules={{ required: "Runtime is required" }}
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              type="number"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="runtime"
              label="Movie runtime"
            />
          )}
        />
        {errors.runtime && (
          <Typography variant="h6" component="p">
            {errors.runtime.message}
          </Typography>
        )}

        <InputLabel id="production-company-label">
          Production Company(s)
        </InputLabel>
        <Controller
          name="productionCompanies"
          control={control}
          rules={{ required: "Production company is required" }}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId="production-company-label"
              id="production-company-select"
              value={value}
              multiple
              onChange={onChange}
            >
              {productionCompanies.map((company) => {
                return (
                  <MenuItem key={company.id} value={company.name}>
                    {company.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        {errors.productionCompanies && (
          <Typography variant="h6" component="p">
            {errors.productionCompanies.message}
          </Typography>
        )}

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                title: "",
                overview: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FantasyMovieForm;
