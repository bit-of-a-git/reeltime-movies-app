import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import { TvShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TvShowListPageTemplate: React.FC<TvShowListPageTemplateProps> = ({
  tvShows,
  title,
  action,
  changePage,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} />
      </Grid>
      <Grid item container spacing={2.5} xs={12}>
        <TvShowList action={action} tvShows={tvShows}></TvShowList>
      </Grid>
    </Grid>
  );
};
export default TvShowListPageTemplate;
