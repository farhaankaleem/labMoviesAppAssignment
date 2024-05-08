import type { Meta, StoryObj } from '@storybook/react';
import ActorHeader from "../components/headerActorList";
import SampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Actor Details Page/ActorHeader",
    component: ActorHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof ActorHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        name: SampleActor.name,
        currentPage: 0,
        totalPages: 1,
        onPrevPage: () => {},
        onNextPage: () => {}
    }
};
Basic.storyName = "Default";