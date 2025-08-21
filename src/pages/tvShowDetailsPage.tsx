import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTvShowPage";
import { getTvShow } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { TvShowDetailsProps } from "../types/tvShows";
import { Typography } from "@mui/material";
import { usePageTitle } from "../hooks/usePageTitle";

const TvShowDetailsPage = () => {
  const { id } = useParams();
  const {
    data: tvShow,
    error,
    isLoading,
    isError,
  } = useQuery<TvShowDetailsProps, Error>(["tvShow", id], () =>
    getTvShow(id || "", true)
  );

  usePageTitle(tvShow?.name || "TV Show Details Page");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
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
