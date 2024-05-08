import type { Meta, StoryObj } from '@storybook/react';
import FilterShowsCard from "../components/filterShowsCard";
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
  title: 'Show Page/FilterShowsCard',
  component: FilterShowsCard,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    )
  ],
} satisfies Meta<typeof FilterShowsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onUserInput: action("filter input"),
    nameFilter: "",
    genreFilter: "All",
    sortOption: { name: "Popularity Desc", value: "popularity.desc" },
    onSortChange: action("sort change")
  },
};
Basic.storyName = "Default";