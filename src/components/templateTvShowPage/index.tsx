import React from "react";
import TvShowHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTvShowImages } from "../../api/tmdb-api";
import { Image, TvShowDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

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
  >(["images", tvShow.id], () =>
    getTvShowImages(tvShow.id, tvShow.original_language)
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

  const tvShowImage: string = posters[0]?.file_path || tvShow.poster_path || "";

  return (
    <>
      <TvShowHeader {...tvShow} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {tvShowImage && (
                <ImageListItem key={tvShowImage} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${tvShowImage}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              )}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTvShowPage;
