import type { Meta, StoryObj } from '@storybook/react';
import TvShowDetails from "../components/tvShowDetails";
import { SampleTvShow } from "./sampleData";
import { MemoryRouter } from "react-router";
import TvShowContextProvider from "../contexts/tvShowContext";
import AuthContextProvider from "../contexts/authContext";

const meta = {
    title: "TV Show Details Page/Details",
    component: TvShowDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <AuthContextProvider><TvShowContextProvider>{Story()}</TvShowContextProvider></AuthContextProvider>,
      ],
} satisfies Meta<typeof TvShowDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: 
    {
      tvShow: SampleTvShow
    }
};
Basic.storyName = "Default";