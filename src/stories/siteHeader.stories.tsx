import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import AuthContextProvider from "../contexts/authContext";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story: React.FC) => <AuthContextProvider><MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter></AuthContextProvider>,
  ],
}satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: {}
 
};
Basic.storyName = "Default";
