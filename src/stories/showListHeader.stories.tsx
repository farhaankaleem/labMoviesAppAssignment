import type { Meta, StoryObj } from '@storybook/react';
import ShowListHeader from "../components/headerShowList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: 'Show Page/Header',
    component: ShowListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    ],
  } satisfies Meta<typeof ShowListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ 
    name:'Dirty Linen'
  }

};
Basic.storyName = "Default";

