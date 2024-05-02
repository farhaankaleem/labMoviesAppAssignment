import React, { useState, useEffect } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie } from "../types/interfaces";

const UpcomingMoviesPage: React.FC= () => {

    const [movies, setMovies] = useState<ListedMovie[]>([]);
    const addToFavourites = (movieId: number) => {
        const updatedMovies = movies.map((m: ListedMovie) =>
          m.id === movieId ? { ...m, favourite: true } : m
        );
        setMovies(updatedMovies);
      };

    useEffect(() => {
        getUpcomingMovies().then(movies => {
        setMovies(movies);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageTemplate
        title='Upcoming Movies'
        movies={movies}
        selectFavourite={addToFavourites}
      />
    );
}

export default UpcomingMoviesPage