
import type { Meta } from '@storybook/react';
import ActorList from "../components/actorList";
import SampleActor from "./sampleActor";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesActors";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";


const meta = {
  title: "Actor Page/ActorList",
  component: ActorList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof ActorList>;
export default meta;


export const Basic = () => {
  const actors = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
    { ...SampleActor, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <ActorList
        actor={actors}
        action={(actor) => <AddToFavouritesIcon {...actor} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


