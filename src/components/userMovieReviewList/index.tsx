import React, { useContext } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import ratings from "../reviewForm/ratingCategories";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    gap: 0.75,
  },
  chipLabel: {
    marginRight: 0.5,
  },
};

const UserReviewsMovieList: React.FC = () => {
  const { userReviews } = useContext(MoviesContext);

  console.log(userReviews);
  return (
    <Box mt={6} sx={{ textAlign: "center" }}>
      <Typography variant="h4">My Movie Reviews</Typography>
      {userReviews.length > 0 ? (
        [...userReviews].reverse().map((review, index) => (
          <Box
            key={index}
            mb={2}
            sx={{ border: 1, borderColor: "primary.info", borderRadius: "4px" }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {review.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", mb: 2.5 }}
                >
                  {review.content}
                </Typography>
                <Typography variant="body2">
                  {/* https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd */}
                  <CalendarIcon fontSize="inherit" sx={{ paddingRight: 0.5 }} />
                  {review.movieId}
                </Typography>
                <Typography variant="body2">
                  <AccessTimeIcon
                    fontSize="inherit"
                    sx={{ paddingRight: 0.5 }}
                  />
                  {/* {ratings.find((element) => element.value === review.rating)} */}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          You haven't written any movie reviews yet. Go to your favourites and
          write some!
        </Typography>
      )}
    </Box>
  );
};

export default UserReviewsMovieList;
