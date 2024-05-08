import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import PageTemplateActors from "../components/templateActorListPage";
import PageTemplateShows from "../components/templateSeriesListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie, getActor, getShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import RemoveFromFavouriteShows from "../components/cardIcons/removeFromFavouriteSeries";
import WriteReview from "../components/cardIcons/writeReview";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../util";
import { ThemeHeaderProps } from "../types/interfaces";


const FavouriteMoviesPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { favouriteActors: actorIds } = useContext(MoviesContext);
  const { favouriteShows: showIds } = useContext(MoviesContext);

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


  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PageTemplate
        title="Favourite Movies"
        movies={allFavourites}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        } } currentPage={0} totalPages={0} onPrevPage={function (): void {
          throw new Error("Function not implemented.");
        } } onNextPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />  

      <PageTemplateActors 
        title="Favourite Actors"
        actors={allFavActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors {...actor} />
            </>
          );
        } } currentPage={0} totalPages={0} onPrevPage={function (): void {
          throw new Error("Function not implemented.");
        } } onNextPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />

      <PageTemplateShows 
        title="Favourite Shows"
        shows={allFavhows}
        action={(show) => {
          return (
            <>
              <RemoveFromFavouriteShows {...show} />
            </>
          );
        } } currentPage={0} totalPages={0} onPrevPage={function (): void {
          throw new Error("Function not implemented.");
        } } onNextPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
        </ThemeProvider>
    </>
  );
};

export default FavouriteMoviesPage;