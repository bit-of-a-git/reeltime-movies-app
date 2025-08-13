import React from "react";
import UserMovieReviewList from "../components/userMovieReviewList";
import { Container } from "@mui/material";

const UserMovieReviewPage: React.FC = () => {
  return (
    <Container>
      <UserMovieReviewList />
    </Container>
  );
};

export default UserMovieReviewPage;
