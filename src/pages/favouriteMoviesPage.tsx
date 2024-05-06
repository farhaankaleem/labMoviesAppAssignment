import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import PageTemplateActors from "../components/templateActorListPage";
import PageTemplateShows from "../components/templateSeriesListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie, getActor, getShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter
} from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import RemoveFromFavouriteShows from "../components/cardIcons/removeFromFavouriteSeries";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { favouriteActors: actorIds } = useContext(MoviesContext);
  const { favouriteShows: showIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId ],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", actorId ],
        queryFn: () => getActor(actorId.toString()),
      };
    })
  );

  const favouriteShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["show", showId ],
        queryFn: () => getShow(showId.toString()),
      };
    })
  );

   // Check if any of the parallel queries is still loading.
   const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

   const isLoadingActor = favouriteActorQueries.find((m) => m.isLoading === true);

   const isLoadingShow = favouriteShowQueries.find((m) => m.isLoading === true);

   if (isLoading || isLoadingActor || isLoadingShow) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const allFavActors = favouriteActorQueries.map((q) => q.data)
  const allFavhows = favouriteShowQueries.map((q) => q.data)
  const displayActors = allFavActors
  const displayShows = allFavhows
  const displayMovies = allFavourites
  ? filterFunction(allFavourites)
  : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
      />  

      <PageTemplateActors 
        title="Favourite Actors"
        actors={displayActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors {...actor} />
            </>
          );
        }}
      />

      <PageTemplateShows 
        title="Favourite Shows"
        shows={displayShows}
        action={(show) => {
          return (
            <>
              <RemoveFromFavouriteShows {...show} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;