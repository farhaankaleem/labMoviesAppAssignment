import React from "react";
import { useParams } from "react-router-dom";
import ShowDetails from "../components/showDetails";
import { TVShowDetails } from "../types/interfaces";
import PageTemplate from "../components/templateShowPage";
import { getShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ShowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: show, error, isLoading, isError } = useQuery<TVShowDetails, Error>(
    ["series_id", id],
    ()=> getShow(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {show ? (
        <>
        <PageTemplate show={show as TVShowDetails}> 
          <ShowDetails {...show as TVShowDetails} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default ShowDetailsPage;