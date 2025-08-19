import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import { TvShowListPageTemplateProps } from "../../types/tvShows";

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
  showFooterActions = false,
  showArrows = true,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} showArrows={showArrows} />
      </Grid>
      <Grid item container spacing={2.5} xs={12}>
        <TvShowList
          action={action}
          tvShows={tvShows}
          showFooterActions={showFooterActions}
        />
      </Grid>
    </Grid>
  );
};
export default TvShowListPageTemplate;
