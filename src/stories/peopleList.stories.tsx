
import type { Meta } from '@storybook/react';
import PeopleList from "../components/peopleList";
import { SamplePerson } from "./sampleData";
import { MemoryRouter } from "react-router";
import RemoveFromFavouritesIcon from "../components/cardIcons/removeFromFavouritesPerson";
import Grid from "@mui/material/Grid";
import PeopleContextProvider from "../contexts/peopleContext";
import AuthContextProvider from '../contexts/authContext';

const meta = {
  title: "People/List",
  component: PeopleList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <AuthContextProvider><PeopleContextProvider><Story /></PeopleContextProvider></AuthContextProvider>,
    ],
    
} satisfies Meta<typeof PeopleList>;
export default meta;


export const Basic = () => {
  const people = [
    { ...SamplePerson, id: 1 },
    { ...SamplePerson, id: 2 },
    { ...SamplePerson, id: 3 },
    { ...SamplePerson, id: 4 },
    { ...SamplePerson, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <PeopleList
        people={people}
        action={(person) => <RemoveFromFavouritesIcon {...person} />}
        showFooterActions
      />
    </Grid>
  );
};
Basic.storyName = "Default";


