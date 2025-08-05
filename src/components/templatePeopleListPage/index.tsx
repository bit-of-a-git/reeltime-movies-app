import React from "react";
import Header from "../headerList";
import Grid from "@mui/material/Grid";
import CastList from "../peopleList";
import { PeopleListPageTemplateProps } from "../../types/interfaces";

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
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} changePage={changePage} />
      </Grid>
      <Grid item container spacing={5}>
        <CastList action={action} people={people}></CastList>
      </Grid>
    </Grid>
  );
};
export default PeopleListPageTemplate;
