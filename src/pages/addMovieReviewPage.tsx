import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/movies";
import { Typography } from "@mui/material";
import { usePageTitle } from "../hooks/usePageTitle";

const WriteReviewPage = () => {
  const location = useLocation();
  const { movieId } = location.state;
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(["movie", movieId], () =>
    getMovie(movieId)
  );

  usePageTitle(
    movie?.title ? `Write a review for ${movie.title}` : "Write Review"
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }
  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <ReviewForm {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie review details</p>
      )}
    </>
  );
};

export default WriteReviewPage;
