import React, { useContext } from "react";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { BaseMovieListProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const FantasyMovieList: React.FC<BaseMovieListProps> = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  // Code currently taken and slightly modified from https://github.com/eoinfennessy/movies-app/ to get started. Will be significantly changed later
  return (
    <>
      <Typography variant="h3">My Fantasy Movies</Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          {fantasyMovies.map((movie, index) => (
            <Grid item xs={4}>
              <Card key={index}>
                <CardContent>
                  <Typography variant="h5">{movie.title}</Typography>
                  {movie.genres.map((genre) => (
                    <Chip label={genre} color="primary" />
                  ))}
                  <Typography variant="body2">{movie.overview}</Typography>
                  <Typography variant="body1">
                    Release Date: {movie.releaseDate}
                  </Typography>
                  <Typography variant="body1">
                    Runtime: {movie.runtime} minutes
                  </Typography>
                  {movie.productionCompanies.map((company) => (
                    <Chip label={company} color="secondary" />
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default FantasyMovieList;
