import type { Meta, StoryObj } from '@storybook/react';
import PersonCard from "../components/personCard";
import { SamplePerson } from "./sampleData";
import { MemoryRouter } from "react-router";
import PersonContextProvider from "../contexts/peopleContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesPerson";
import AuthContextProvider from "../contexts/authContext";

const meta = {
  title: 'People/Card',
  component: PersonCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <AuthContextProvider><PersonContextProvider>{Story()}</PersonContextProvider></AuthContextProvider>,
  ],
} satisfies Meta<typeof PersonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (person ) => <AddToFavouritesIcon {...person} />,
    person: SamplePerson,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SamplePerson, profile_path: null };
export const Exceptional: Story = {
  args: {
    person: sampleNoPoster,
    action: (person ) => <AddToFavouritesIcon {...person} />,
  }
};
Exceptional.storyName = "Exception";