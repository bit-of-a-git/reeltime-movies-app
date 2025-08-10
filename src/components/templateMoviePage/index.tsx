import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { Image, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Paper } from "@mui/material";

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
  >(["images", movie.id], () =>
    getMovieImages(movie.id, movie.original_language)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const { posters } = data as {
    posters: Image[];
  };

  const movieImage: string = posters[0]?.file_path || movie.poster_path || "";

  return (
    <>
      <MovieHeader {...movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <Paper elevation={5}>
            <ImageList cols={1}>
              {movieImage && (
                <ImageListItem key={movieImage} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieImage}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              )}
            </ImageList>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
