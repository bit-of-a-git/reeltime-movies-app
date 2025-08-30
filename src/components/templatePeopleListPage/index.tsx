import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import PeopleList from "../peopleList";
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
        <PeopleList
          action={action}
          people={people}
          showFooterActions={showFooterActions}
        ></PeopleList>
      </Grid>
    </Grid>
  );
};
export default PeopleListPageTemplate;
