import type { Meta, StoryObj } from '@storybook/react';
import Header from "../components/headerList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AuthContextProvider from '../contexts/authContext';
import { action } from "@storybook/addon-actions";

const meta = {
    title: 'Home Page/Header',
    component: Header,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <AuthContextProvider><MoviesContextProvider>{Story()}</MoviesContextProvider></AuthContextProvider>,
    ],
  } satisfies Meta<typeof Header>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Discover Movies',
    changePage: action("changePage"),
  },
};
Basic.storyName = "Default";
