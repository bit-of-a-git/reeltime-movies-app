import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { Image, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Card, CardMedia, Typography } from "@mui/material";
import img from "../../images/no-image-available.jpg";

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({
  movie,
  children,
}) => {
  const { data, error, isLoading, isError } = useQuery<
    { backdrops: Image[]; id: number; logos: Image[]; posters: Image[] },
    Error
  >(["images", movie.id, movie.original_language], () =>
    getMovieImages(movie.id, movie.original_language)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }

  const movieImage: string =
    data?.posters[0]?.file_path || movie.poster_path || "";

  return (
    <>
      <MovieHeader {...movie} />

      <Grid container spacing={5} sx={{ p: 1 }}>
        <Grid item xs={3}>
          <Card elevation={5} sx={{ marginTop: "10px", borderRadius: "20px" }}>
            <CardMedia
              component="img"
              image={
                movieImage
                  ? `https://image.tmdb.org/t/p/w500${movieImage}`
                  : img
              }
              alt={`Poster for ${movie.title}`}
            />
          </Card>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
