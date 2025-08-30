
import type { Meta } from '@storybook/react';
import TvShowList from "../components/tvShowList";
import { SampleTvShow } from './sampleData';
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesTvShow";
import Grid from "@mui/material/Grid";
import TvShowContextProvider from "../contexts/tvShowContext";
import AuthContextProvider from '../contexts/authContext';

const meta = {
  title: "Home Page/TvShowList",
  component: TvShowList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <AuthContextProvider><TvShowContextProvider><Story /></TvShowContextProvider></AuthContextProvider>,
    ],
    
} satisfies Meta<typeof TvShowList>;
export default meta;


export const Basic = () => {
  const tvShows = [
    { ...SampleTvShow, id: 1 },
    { ...SampleTvShow, id: 2 },
    { ...SampleTvShow, id: 3 },
    { ...SampleTvShow, id: 4 },
    { ...SampleTvShow, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TvShowList
        tvShows={tvShows}
        action={(tvShow) => <AddToFavouritesIcon {...tvShow} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


