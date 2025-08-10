import type { Meta, StoryObj } from '@storybook/react';
import FilterCard from "../components/filterCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const meta = {
  title: 'Home Page/FilterCard',
  component: FilterCard,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    )
  ],
} satisfies Meta<typeof FilterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onUserInput: action("filter input"),
    titleFilter: "",
    genreFilter: "All",
  },
};
Basic.storyName = "Default";