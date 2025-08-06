import React, { useContext } from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { PersonContext } from "../contexts/personContext";
import { useQueries } from "react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouritesPerson";
import { Typography, Box } from "@mui/material";

const FavouritePeoplePage: React.FC = () => {
  const { favourites: peopleIds } = useContext(PersonContext);
  console.log("Favourite actors page is working", peopleIds);

  // Create an array of queries and run them in parallel.
  const favouritePeopleQueries = useQueries(
    peopleIds.map((personId) => {
      return {
        queryKey: ["person", personId],
        queryFn: () => getPerson(personId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouritePeopleQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouritePeopleQueries.map((q) => q.data);

  return (
    <>
      {allFavourites.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            You have no favourite actors yet.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Why not browse and add to your list?
          </Typography>
        </Box>
      ) : (
        <PageTemplate
          title="Favourite Cast/Crew"
          people={allFavourites}
          action={(person) => {
            return (
              <>
                <RemoveFromFavourites {...person} />
              </>
            );
          }}
        />
      )}
    </>
  );
};

export default FavouritePeoplePage;
