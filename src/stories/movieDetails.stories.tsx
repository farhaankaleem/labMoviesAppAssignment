import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args:{ 
        movie: SampleMovie,
        cast: [
          {
            "adult": false,
            "gender": 2,
            "id": 819,
            "known_for_department": "Acting",
            "name": "Edward Norton",
            "original_name": "Edward Norton",
            "popularity": 26.99,
            "profile_path": "/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg",
            "cast_id": 4,
            "character": "The Narrator",
            "credit_id": "52fe4250c3a36847f80149f3",
            "order": 0
          },
          {
            "adult": false,
            "gender": 2,
            "id": 287,
            "known_for_department": "Acting",
            "name": "Brad Pitt",
            "original_name": "Brad Pitt",
            "popularity": 45.202,
            "profile_path": "/huV2cdcolEUwJy37QvH914vup7d.jpg",
            "cast_id": 5,
            "character": "Tyler Durden",
            "credit_id": "52fe4250c3a36847f80149f7",
            "order": 1
          },
          {
            "adult": false,
            "gender": 1,
            "id": 1283,
            "known_for_department": "Acting",
            "name": "Helena Bonham Carter",
            "original_name": "Helena Bonham Carter",
            "popularity": 22.112,
            "profile_path": "/DDeITcCpnBd0CkAIRPhggy9bt5.jpg",
            "cast_id": 285,
            "character": "Marla Singer",
            "credit_id": "631f0de8bd32090082733691",
            "order": 2
          }
          ]
      }
};
Basic.storyName = "Default";