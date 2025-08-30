import type { Meta, StoryObj } from '@storybook/react';
import TvShowCard from "../components/tvShowCard";
import { SampleTvShow } from './sampleData';
import { MemoryRouter } from "react-router";
import TvShowContextProvider from "../contexts/tvShowContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesTvShow";
import AuthContextProvider from "../contexts/authContext";

const meta = {
  title: 'Home Page/TvShowCard',
  component: TvShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider><TvShowContextProvider>{Story()}</TvShowContextProvider></AuthContextProvider>,
  ],
} satisfies Meta<typeof TvShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
    tvShow: SampleTvShow,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTvShow, poster_path: null };
export const Exceptional: Story = {
  args: {
    tvShow: sampleNoPoster,
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
  }
};
Exceptional.storyName = "Exception";