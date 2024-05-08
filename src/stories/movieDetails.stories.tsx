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
              "id": 22970,
              "known_for_department": "Acting",
              "name": "Peter Dinklage",
              "original_name": "Peter Dinklage",
              "popularity": 30.6,
              "profile_path": "/lRsRgnksAhBRXwAB68MFjmTtLrk.jpg",
              "character": "Tyrion Lannister",
              "credit_id": "5256c8b219c2956ff6047cd8",
              "order": 0
            },
            {
              "adult": false,
              "gender": 1,
              "id": 17286,
              "known_for_department": "Acting",
              "name": "Lena Headey",
              "original_name": "Lena Headey",
              "popularity": 24.88,
              "profile_path": "/xR2IBnBlUdyBe5hecaVdtRuQqUE.jpg",
              "character": "Cersei Lannister",
              "credit_id": "5256c8ad19c2956ff60479ce",
              "order": 3
            },
            {
              "adult": false,
              "gender": 2,
              "id": 12795,
              "known_for_department": "Acting",
              "name": "Nikolaj Coster-Waldau",
              "original_name": "Nikolaj Coster-Waldau",
              "popularity": 18.686,
              "profile_path": "/rpFOERbHkj7GWxkinUNiQ76sSGk.jpg",
              "character": "Jaime Lannister",
              "credit_id": "5256c8ad19c2956ff604793e",
              "order": 5
            },
            {
              "adult": false,
              "gender": 1,
              "id": 1223786,
              "known_for_department": "Acting",
              "name": "Emilia Clarke",
              "original_name": "Emilia Clarke",
              "popularity": 42.737,
              "profile_path": "/u59kTmNHXzaGZqokivxLPiBVIML.jpg",
              "character": "Daenerys Targaryen",
              "credit_id": "5256c8af19c2956ff60479f6",
              "order": 6
            }
          ]
      }
};
Basic.storyName = "Default";