import React from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTvShowPage";
import { getTvShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { TvShowDetailsProps } from "../types/interfaces";

const TvShowDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: tvShow,
    error,
    isLoading,
    isError,
  } = useQuery<TvShowDetailsProps, Error>(["tvShow", id], () =>
    getTvShow(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const trailer = tvShow?.videos?.results?.find(
    (item) => item.type === "Trailer" && item.site === "YouTube"
  );

  return (
    <>
      {tvShow ? (
        <>
          <PageTemplate tvShow={tvShow}>
            <TvShowDetails tvShow={tvShow} trailer={trailer} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for TV show details</p>
      )}
    </>
  );
};

export default TvShowDetailsPage;
