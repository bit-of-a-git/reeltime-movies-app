import type { Meta, StoryObj } from '@storybook/react';
import PersonCredits from "../components/personCredits";
import { SamplePerson } from "./sampleData";
import { MemoryRouter } from "react-router";
import PeopleContextProvider from "../contexts/peopleContext";
import AuthContextProvider from "../contexts/authContext";

const meta = {
    title: "People/Credits",
    component: PersonCredits,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <AuthContextProvider><PeopleContextProvider>{Story()}</PeopleContextProvider></AuthContextProvider>,
      ],
} satisfies Meta<typeof PersonCredits>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: 
    {
      person: SamplePerson
    }
};
Basic.storyName = "Default";