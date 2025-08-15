import React from "react";
import Person from "../personCard";
import Grid from "@mui/material/Grid";
import { BasePeopleListProps } from "../../types/interfaces";

const castList: React.FC<BasePeopleListProps> = ({
  people,
  action,
  showFooterActions = false,
}) => {
  const castCards = people.map((p) => (
    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Person
        key={p.id}
        person={p}
        action={action}
        showFooterActions={showFooterActions}
      />
    </Grid>
  ));
  return castCards;
};

export default castList;
