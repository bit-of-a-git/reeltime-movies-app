import React from "react";
import FantasyMovieList from "../components/fantasyMovieList";
import FantasyMovieForm from "../components/fantasyMovieForm";
import { Container } from "@mui/material";

const FantasyMoviePage: React.FC = () => {
  return (
    <Container>
      <FantasyMovieList />
      <FantasyMovieForm />
    </Container>
  );
};

export default FantasyMoviePage;
