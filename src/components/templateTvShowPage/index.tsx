import React from "react";
import TvShowHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import { getTvShowImages } from "../../api/tmdb-api";
import { Image } from "../../types/common";
import { TvShowDetailsProps } from "../../types/tvShows";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Card, CardMedia, Typography } from "@mui/material";
import img from "../../images/no-image-available.jpg";
import AddToMustWatchIcon from "../cardIcons/addToMustWatchTvShow";

interface TemplateTvShowPageProps {
  tvShow: TvShowDetailsProps;
  children: React.ReactElement;
}

const TemplateTvShowPage: React.FC<TemplateTvShowPageProps> = ({
  tvShow,
  children,
}) => {
  const { data, error, isLoading, isError } = useQuery<
    { backdrops: Image[]; id: number; logos: Image[]; posters: Image[] },
    Error
  >(["images", tvShow.id, tvShow.original_language], () =>
    getTvShowImages(tvShow.id, tvShow.original_language)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }

  const tvShowImage: string =
    data?.posters[0]?.file_path || tvShow.poster_path || "";

  return (
    <>
      <TvShowHeader
        tvShow={tvShow}
        action={(tvShow) => <AddToMustWatchIcon {...tvShow} />}
      />

      <Grid container spacing={5} sx={{ p: 1 }}>
        <Grid item xs={3}>
          <Card elevation={5} sx={{ marginTop: "10px", borderRadius: "20px" }}>
            <CardMedia
              component="img"
              image={
                tvShowImage
                  ? `https://image.tmdb.org/t/p/w500${tvShowImage}`
                  : img
              }
              alt={`Poster for ${tvShow.name}`}
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

export default TemplateTvShowPage;
