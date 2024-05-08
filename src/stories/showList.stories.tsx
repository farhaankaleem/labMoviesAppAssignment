import type { Meta } from '@storybook/react';
import ShowList from "../components/TVShowList";
import SampleShow from "./sampleShow";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import Grid from "@mui/material/Grid";
import { TVShow } from '../types/interfaces';
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesSeries'

const meta: Meta = {
  title: "Show Page/ShowList",
  component: ShowList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <MoviesContextProvider>
          <Grid container spacing={5}>
            <Story />
          </Grid>
        </MoviesContextProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

const action = (show: TVShow) => {
  return <AddToFavouritesIcon {...show} />
};

export const Basic = () => {
  const shows = [
    { ...SampleShow, id: 1 },
    { ...SampleShow, id: 2 },
    { ...SampleShow, id: 3 },
    { ...SampleShow, id: 4 },
    { ...SampleShow, id: 5 },
  ];
  return <ShowList shows={shows} action={action} />;
};
Basic.storyName = "Default";