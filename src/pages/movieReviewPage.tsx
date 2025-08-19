import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { usePageTitle } from "../hooks/usePageTitle";

const MovieReviewPage = () => {
  const {
    state: { movie, review },
  } = useLocation();

  usePageTitle(`${movie.title} Review`);

  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
