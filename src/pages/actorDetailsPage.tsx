import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import { PersonDetails, ThemeHeaderProps } from "../types/interfaces";
import PageTemplate from "../components/templateActorPage";
import { getActor } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../util";

const ActorDetailsPage: React.FC<ThemeHeaderProps>= ({isDarkMode}) => {
  const { id } = useParams();
  const { data: actor, error, isLoading, isError } = useQuery<PersonDetails, Error>(
    ["person", id],
    ()=> getActor(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {actor ? (
        <>
        <PageTemplate actor={actor as PersonDetails}> 
          <ActorDetails {...actor as PersonDetails} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for actor details</p>
    )}
    </ThemeProvider>
    </>
  );
};

export default ActorDetailsPage;