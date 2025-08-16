import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";
import { Typography } from "@mui/material";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(["movie", id], () =>
    getMovie(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }

  const trailer = movie?.videos?.results?.find(
    (item) =>
      item.type === "Trailer" &&
      item.site === "YouTube" &&
      (item.official ?? true) // Falls back to true if the "official" flag is absent
  );

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} trailer={trailer} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
