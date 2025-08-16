import { useParams } from "react-router-dom";
import PersonInfo from "../components/personInfo";
import PersonCredits from "../components/personCredits";
import { getPerson } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { Person } from "../types/interfaces";
import { Container, Paper, Grid, Box, Typography } from "@mui/material";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const {
    data: person,
    error,
    isLoading,
    isError,
  } = useQuery<Person, Error>(["person", id], () => getPerson(id || ""));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4">{(error as Error).message}</Typography>;
  }

  // Code currently taken and modified from https://github.com/eoinfennessy/movies-app/ to get started. Will be changed later
  return (
    <>
      {person ? (
        <>
          <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3.5}>
                <PersonInfo person={person} />
              </Grid>
              <Grid item xs={8.5}>
                <Paper elevation={5}>
                  <Box padding={"20px"}>
                    <Typography variant="h4" gutterBottom>
                      Biography
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {person.biography || "Unavailable"}
                    </Typography>
                  </Box>
                  <PersonCredits person={person} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <p>Waiting for person details</p>
      )}
    </>
  );
};

export default PersonDetailsPage;
