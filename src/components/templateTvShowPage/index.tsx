import React from "react";
import TvShowHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTvShowImages } from "../../api/tmdb-api";
import { Image, TvShowDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateTvShowPageProps {
  tvShow: TvShowDetailsProps;
  children: React.ReactElement;
}

const TemplateTvShowPage: React.FC<TemplateTvShowPageProps> = ({
  tvShow,
  children,
}) => {
  const { data, error, isLoading, isError } = useQuery<Image[], Error>(
    ["images", tvShow.id],
    () => getTvShowImages(tvShow.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data as Image[];

  return (
    <>
      <TvShowHeader {...tvShow} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {images.map((image: Image) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={"Image alternative"}
                  />
                </ImageListItem>
              ))}
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
