import { useContext } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  CardMedia,
  CardHeader,
  Chip,
  CardActions,
} from "@mui/material";
import { MoviesContext } from "../contexts/moviesContext";
import ratings from "../components/reviewForm/ratingCategories";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Header from "../components/headerList";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import DeleteReviewIcon from "../components/cardIcons/deleteReview";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  poster: {
    borderRadius: "10px",
  },
  divider: {
    marginY: "15px",
    border: 0,
    height: "2px",
    background: "#d4d4d4ff",
  },
};

const UserMovieReviewPage = () => {
  const { reviews } = useContext(MoviesContext);
  const reviewedMovieIds = reviews.map((review) => review.movieId);

  // Create an array of queries and run them in parallel.
  const reviewedMovieQueries = useQueries(
    reviewedMovieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const reviewsWithMovieData = reviews.map((review, index) => {
    const movieData = reviewedMovieQueries[index].data;
    return {
      ...review,
      movieTitle: movieData?.title,
      image: movieData?.poster_path,
      imdb_id: movieData?.imdb_id,
    };
  });

  const isLoading = reviewedMovieQueries.some((q) => q.isLoading);
  if (isLoading) return <Spinner />;

  return (
    <>
      {reviews.length === 0 ? (
        <Box mt={6} sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            You haven't written any movie reviews yet.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Why not go to your favourites and add some?
          </Typography>
        </Box>
      ) : (
        <>
          <Grid style={styles.root}>
            <Grid item xs={12}>
              <Header title="My Reviews" />
            </Grid>
            <Grid container spacing={2}>
              {[...reviewsWithMovieData].reverse().map((review, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardHeader
                      title={
                        <Typography variant="h4" align="center">
                          {review.movieTitle}
                        </Typography>
                      }
                    />
                    <Grid container spacing={2} sx={{ p: 1.5 }}>
                      <Grid item xs={12} sm={4}>
                        <Link to={`/movies/${review.movieId}`}>
                          <CardMedia
                            component="img"
                            image={`https://image.tmdb.org/t/p/w300${review.image}`}
                            alt={review.movieTitle}
                            sx={{
                              ...styles.poster,
                            }}
                          />
                        </Link>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h5" sx={{ pb: 1 }} gutterBottom>
                          {review.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {review.content}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={styles.divider} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {(() => {
                        const ratingObject = ratings.find(
                          ({ value }) => value === review.rating
                        );
                        return (
                          <Chip
                            label={`My rating: ${ratingObject?.label}`}
                            icon={
                              <ThumbsUpDownIcon
                                fontSize="inherit"
                                color="inherit"
                                sx={{ color: "#fff" }}
                              />
                            }
                            sx={{
                              backgroundColor: ratingObject?.color,
                              color: "#fff",
                              fontSize: "inherit",
                            }}
                          />
                        );
                      })()}
                      <Link
                        to={`https://www.imdb.com/title/${review.imdb_id}/reviews/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Compare to IMDB reviews
                        </Typography>
                      </Link>
                    </Box>
                    <CardActions
                      sx={{
                        pt: "0px",
                        pb: "4px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <DeleteReviewIcon {...review} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default UserMovieReviewPage;
