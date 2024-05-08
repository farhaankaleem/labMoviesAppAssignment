import type { Meta, StoryObj } from '@storybook/react';
import ActorListHeader from "../components/headerActorList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: 'Actor Page/Header',
    component: ActorListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    ],
  } satisfies Meta<typeof ActorListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ 
    name:'Tom Cruise',
    currentPage: 0,
    totalPages: 1,
    onPrevPage: () => {},
    onNextPage: () => {}
  }

};
Basic.storyName = "Default";

