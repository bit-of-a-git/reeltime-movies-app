import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import CastList from "../peopleList";
import { PeopleListPageTemplateProps } from "../../types/people";
import { usePageTitle } from "../../hooks/usePageTitle";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const PeopleListPageTemplate: React.FC<PeopleListPageTemplateProps> = ({
  people,
  title,
  action,
  changePage,
  showFooterActions = false,
}) => {
  usePageTitle(title);

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} />
      </Grid>
      <Grid item container spacing={2.5} xs={12}>
        <CastList
          action={action}
          people={people}
          showFooterActions={showFooterActions}
        ></CastList>
      </Grid>
    </Grid>
  );
};
export default PeopleListPageTemplate;
