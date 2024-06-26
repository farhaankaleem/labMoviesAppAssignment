import type { Meta, StoryObj } from '@storybook/react';
import ActorDetails from "../components/actorDetails";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: "Actor Details Page/ActorDetails",
    component: ActorDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof ActorDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args:{ 
            "adult": false,
            "also_known_as": [
              "Thomas Jeffrey Hanks",
              "Том Хэнкс",
              "توم هانكس",
              "トム・ハンクス",
              "톰 행크스",
              "ทอม แฮงส์",
              "汤姆·汉克斯",
              "Том Генкс",
              "Том Хенкс",
              "Томас Джеффрі Генкс",
              "Τομ Χανκς",
              "टॉम हैंक्स",
              "ടോം ഹാങ്ക്സ്",
              "湯姆‧漢克斯",
              "湯姆·漢克"
            ],
            "biography": "Thomas Jeffrey Hanks (born July 9, 1956) is an American actor and filmmaker. Known for both his comedic and dramatic roles, Hanks is one of the most popular and recognizable film stars worldwide, and is widely regarded as an American cultural icon.\n\nHanks made his breakthrough with leading roles in the comedies Splash (1984) and Big (1988). He won two consecutive Academy Awards for Best Actor for starring as a gay lawyer suffering from AIDS in Philadelphia (1993) and a young man with below-average IQ in Forrest Gump (1994). Hanks collaborated with film director Steven Spielberg on five films: Saving Private Ryan (1998), Catch Me If You Can (2002), The Terminal (2004), Bridge of Spies (2015), and The Post (2017), as well as the 2001 miniseries Band of Brothers, which launched him as a director, producer, and screenwriter.\n\nHanks' other notable films include the romantic comedies Sleepless in Seattle (1993) and You've Got Mail (1998); the dramas Apollo 13 (1995), The Green Mile (1999), Cast Away (2000), Road to Perdition (2002), and Cloud Atlas (2012); and the biographical dramas Saving Mr. Banks (2013), Captain Phillips (2013), Sully (2016), and A Beautiful Day in the Neighborhood (2019). He has also appeared as the title character in the Robert Langdon film series, and has voiced Sheriff Woody in the Toy Story film series.\n\nDescription above from the Wikipedia article Tom Hanks, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
            "birthday": "1956-07-09",
            "deathday": null,
            "gender": 2,
            "homepage": null,
            "id": 31,
            "imdb_id": "nm0000158",
            "known_for_department": "Acting",
            "name": "Tom Hanks",
            "place_of_birth": "Concord, California, USA",
            "popularity": 82.989,
            "profile_path": "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg"
          
      }
};
Basic.storyName = "Default";