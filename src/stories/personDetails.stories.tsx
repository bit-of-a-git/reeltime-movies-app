import type { Meta, StoryObj } from '@storybook/react';
import PersonInfo from "../components/personInfo";
import { SamplePerson } from "./sampleData";
import { MemoryRouter } from "react-router";
import PeopleContextProvider from "../contexts/peopleContext";
import AuthContextProvider from "../contexts/authContext";

const meta = {
    title: "People/Info",
    component: PersonInfo,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <AuthContextProvider><PeopleContextProvider>{Story()}</PeopleContextProvider></AuthContextProvider>,
      ],
} satisfies Meta<typeof PersonInfo>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: 
    {
      person: SamplePerson
    }
};
Basic.storyName = "Default";