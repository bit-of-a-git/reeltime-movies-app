import React, { useContext } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";

const FantasyMovieList: React.FC = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  // Code currently taken and slightly modified from https://github.com/eoinfennessy/movies-app/ to get started. Will be significantly changed later
  return (
    <Box mt={2}>
      <Typography variant="h3">My Fantasy Movies</Typography>
      <Box>
        {[...fantasyMovies].reverse().map((movie, index) => (
          <Box key={index} mb={2}>
            <Card>
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                {movie.genres.map((genre) => (
                  <Chip key={genre} label={genre} color="primary" />
                ))}
                <Typography variant="body2">{movie.overview}</Typography>
                <Typography variant="body1">
                  Release Date: {movie.releaseDate?.toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Runtime: {movie.runtime} minutes
                </Typography>
                {movie.productionCompanies.map((company) => (
                  <Chip key={company} label={company} color="secondary" />
                ))}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FantasyMovieList;
