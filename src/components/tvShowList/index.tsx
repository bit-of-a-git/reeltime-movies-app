import React from "react";
import TvShow from "../tvShowCard/";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps } from "../../types/tvShows";

const TvShowList: React.FC<BaseTvShowListProps> = ({
  tvShows,
  action,
  showFooterActions = false,
}) => {
  const tvShowCards = tvShows.map((t) => (
    <Grid key={t.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
      <TvShow
        tvShow={t}
        action={action}
        showFooterActions={showFooterActions}
      />
    </Grid>
  ));
  return tvShowCards;
};

export default TvShowList;
