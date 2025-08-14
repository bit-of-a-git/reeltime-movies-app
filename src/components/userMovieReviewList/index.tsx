import React, { useContext } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  CardMedia,
  CardHeader,
  Chip,
} from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import ratings from "../reviewForm/ratingCategories";
import { useQueries } from "react-query";
import { getMovie } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Header from "../headerList";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  card: {
    borderRadius: "12px",
  },
  poster: {
    borderRadius: "10px",
    maxWidth: "33%",
    margin: "0 auto",
  },
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  divider: {
    marginY: "15px",
    border: 0,
    height: "3px",
    background: "#d4d4d4ff",
  },
};

const UserReviewsMovieList: React.FC = () => {
  const { userReviews } = useContext(MoviesContext);
  const reviewedMovieIds = userReviews.map((review) => review.movieId);

  // Create an array of queries and run them in parallel.
  const reviewedMovieQueries = useQueries(
    reviewedMovieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const reviewsWithMovieData = userReviews.map((review, index) => {
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
      {userReviews.length === 0 ? (
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
            <Grid container spacing={2} xs={12}>
              {[...reviewsWithMovieData].reverse().map((review, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={styles.card}>
                    <CardHeader
                      title={
                        <Typography variant="h4" align="center">
                          {review.movieTitle}
                        </Typography>
                      }
                    />
                    <Link to={`/movies/${review.movieId}`}>
                      <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w300${review.image}`}
                        alt={review.movieTitle}
                        sx={styles.poster}
                      />
                    </Link>
                    <Divider sx={styles.divider} />
                    <Typography variant="h5" align="center">
                      {review.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-wrap",
                        m: 2,
                      }}
                    >
                      {review.content}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1.5,
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

export default UserReviewsMovieList;
