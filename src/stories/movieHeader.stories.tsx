import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/headerMovie";
import { SampleMovie } from "./sampleData";
import { MemoryRouter } from "react-router";
import AuthContextProvider from "../contexts/authContext";

import React from 'react';

const meta = {
    title: "Movie Details Page/Header",
    component: MovieHeader,
    decorators: [
        (Story: React.FC) => <AuthContextProvider><MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter></AuthContextProvider>,
    ],
} satisfies Meta<typeof MovieHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        movie: SampleMovie,
        action: () => null
    }
};
Basic.storyName = "Default";