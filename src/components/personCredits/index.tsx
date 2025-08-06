import { ExpandMore, Movie, Person, TvRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 75,
    right: 2,
  },
  genericBox: {
    maxWidth: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  genericCard: {
    display: "inline-block",
    margin: "0 10px",
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0)",
    },
  },
  similarMovieImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  creditsImage: {
    borderRadius: "8px",
  },
  cardTitle: {
    marginBottom: "5px",
  },
  cardSubtitle: {},
};

export default function PersonCredits({ person }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      {person.movie_credits.cast.length > 0 && (
        <Accordion
          disableGutters
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Person />
            <Typography variant="h5">As Cast Member</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={styles.genericBox}>
              {person.movie_credits.cast
                .filter((credit) => credit.poster_path)
                .map((credit, index) => (
                  <Link key={`cast-${index}`} to={`/movies/${credit.id}`}>
                    <Card sx={{ ...styles.genericCard, width: 200 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={styles.cardTitle}
                      >
                        {credit.title}
                      </Typography>
                      <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                        alt={credit.title}
                        sx={styles.similarMovieImage}
                      />
                      <CardContent>
                        <Typography variant="body2" style={styles.cardSubtitle}>
                          {credit.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      {person.movie_credits.crew.length > 0 && (
        <Accordion
          disableGutters
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Person />
            <Typography variant="h5">As Crew Member</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={styles.genericBox}>
              {person.movie_credits.crew.map((credit, index) => (
                <Link key={`crew-${index}`} to={`/movies/${credit.id}`}>
                  <Card sx={{ ...styles.genericCard, width: 200 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={styles.cardTitle}
                    >
                      {credit.title}
                    </Typography>
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                      alt={credit.title}
                      sx={styles.similarMovieImage}
                    />
                    <CardContent>
                      <Typography variant="body2" style={styles.cardSubtitle}>
                        {credit.job}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
