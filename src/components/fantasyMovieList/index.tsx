import { useContext } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import DeleteFantasyMovieIcon from "../cardIcons/deleteFantasyMovie";
import { Timestamp } from "firebase/firestore";

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

const FantasyMovieList = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  // Code currently taken and slightly modified from https://github.com/eoinfennessy/movies-app/ to get started. Will be significantly changed later
  return (
    <Box mt={2}>
      <Typography variant="h4">My Fantasy Movies</Typography>
      {fantasyMovies.length > 0 ? (
        fantasyMovies.map((movie, index) => (
          <Box
            key={index}
            mb={2}
            sx={{ border: 1, borderColor: "primary.info", borderRadius: "4px" }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", mb: 2.5 }}
                >
                  {movie.overview}
                </Typography>
                <Typography variant="body2">
                  {/* https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd */}
                  <CalendarIcon fontSize="inherit" sx={{ paddingRight: 0.5 }} />
                  {movie.releaseDate instanceof Timestamp
                    ? movie.releaseDate.toDate().toISOString().split("T")[0]
                    : movie.releaseDate instanceof Date
                    ? movie.releaseDate.toISOString().split("T")[0]
                    : null}
                </Typography>
                <Typography variant="body2">
                  <AccessTimeIcon
                    fontSize="inherit"
                    sx={{ paddingRight: 0.5 }}
                  />
                  {movie.runtime} minutes
                </Typography>
                <Box component="ul" sx={styles.chipSet}>
                  <li>
                    <Chip
                      label="Genres"
                      sx={styles.chipLabel}
                      color="primary"
                    />
                  </li>
                  {movie.genres.map((genre) => (
                    <li key={`li-${genre}`}>
                      <Chip key={`chip-${genre}`} label={genre} />
                    </li>
                  ))}
                </Box>
                <Box component="ul" sx={styles.chipSet}>
                  <li>
                    <Chip
                      label="Production"
                      sx={styles.chipLabel}
                      color="secondary"
                    />
                  </li>
                  {movie.productionCompanies.map((company) => (
                    <li key={`li-${company}`}>
                      <Chip key={`chip-${company}`} label={company} />
                    </li>
                  ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <DeleteFantasyMovieIcon index={index} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          You have no fantasy movies yet. Create one using the form!
        </Typography>
      )}
    </Box>
  );
};

export default FantasyMovieList;
