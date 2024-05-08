import type { Meta, StoryObj } from '@storybook/react';
import ShowHeader from "../components/headerShowList";
import SampleShow from "./sampleShow";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Show Details Page/ShowHeader",
    component: ShowHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof ShowHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        name: SampleShow.name
    }
};
Basic.storyName = "Default";