import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieT, CastMember } from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  const { data: cast } = useQuery<CastMember[], Error>(
    ["CastMember", id],
    ()=> getCast(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie as MovieT}> 
          <MovieDetails movie={movie as MovieT}
          cast = {cast as CastMember[]} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;