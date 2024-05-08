import React from "react";
import { useParams } from "react-router-dom";
import ShowDetails from "../components/showDetails";
import { TVShowDetails, CastMember, ThemeHeaderProps } from "../types/interfaces";
import PageTemplate from "../components/templateShowPage";
import { getShow, getCastSeries } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../util";

const ShowDetailsPage: React.FC<ThemeHeaderProps>= ({isDarkMode}) => {
  const { id } = useParams();
  const { data: show, error, isLoading, isError } = useQuery<TVShowDetails, Error>(
    ["series_id", id],
    ()=> getShow(id||"")
  );

  const { data: cast } = useQuery<CastMember[], Error>(
    ["CastMemberSeries", id],
    ()=> getCastSeries(id||"")
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
      {show ? (
        <>
        <PageTemplate show={show as TVShowDetails}> 
          <ShowDetails show={show as TVShowDetails} 
          cast = {cast as CastMember[]}/>
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </ThemeProvider>
    </>
  );
};

export default ShowDetailsPage;