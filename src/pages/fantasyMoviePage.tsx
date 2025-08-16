import FantasyMovieList from "../components/fantasyMovieList";
import FantasyMovieForm from "../components/fantasyMovieForm";
import { Container, Grid } from "@mui/material";

const FantasyMoviePage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FantasyMovieForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <FantasyMovieList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FantasyMoviePage;
