import type { Meta, StoryObj } from '@storybook/react';
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesActors";

const meta = {
  title: 'Actor Page/ActorCard',
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (actor ) => <AddToFavouritesIcon {...actor} />,
    actor: SampleActor,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleActor, profile_path: undefined };
export const Exceptional: Story = {
  args: {
    actor: sampleNoPoster,
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";