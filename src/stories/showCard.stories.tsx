import type { Meta, StoryObj } from '@storybook/react';
import ShowCard from "../components/showCard";
import SampleShow from "./sampleShow";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesSeries";

const meta = {
  title: 'Show Page/ShowCard',
  component: ShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof ShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (show ) => <AddToFavouritesIcon {...show} />,
    show: SampleShow,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleShow, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    show: sampleNoPoster,
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";