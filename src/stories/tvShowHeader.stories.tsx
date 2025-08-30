import type { Meta, StoryObj } from '@storybook/react';
import TvShowHeader from "../components/headerTvShow";
import { SampleTvShow } from "./sampleData";
import { MemoryRouter } from "react-router";
import AuthContextProvider from "../contexts/authContext";

import React from 'react';

const meta = {
    title: "Tv Show Details Page/Header",
    component: TvShowHeader,
    decorators: [
        (Story: React.FC) => <AuthContextProvider><MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter></AuthContextProvider>,
    ],
} satisfies Meta<typeof TvShowHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        tvShow: SampleTvShow,
        action: () => null
    }
};
Basic.storyName = "Default";