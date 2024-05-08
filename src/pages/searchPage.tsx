import React from "react";
import { getSeacrh } from "../api/tmdb-api";
import { ListedMovie, Person, SearchResp, TVShow, ThemeHeaderProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import ShowCard from "../components/showCard";
import AddToFavouritesIconSeries from "../components/cardIcons/addToFavouritesSeries";
import ActorCard from "../components/actorCard";
import AddToFavouritesIconActors from "../components/cardIcons/addToFavouritesActors";
import { Grid } from "@mui/material";
import {  ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../util";



const SearchPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const {searchValue} = useParams();
  const { data, error, isLoading, isError } = useQuery<SearchResp, Error>(["multiSearch", searchValue], () => getSeacrh(`${searchValue}`));
 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const searchResult = (result: SearchResp) => {

    switch (result.media_type) {
        case "movie":
            const movie = result as unknown as ListedMovie
            return (
                <>
                    <MovieCard 
                    movie={movie}
                    action={(movie: ListedMovie) => {
                        return <AddToFavouritesIcon {...movie} />
                    }}
                 />
                </>
            );
        case "tv": 
            const show = result as unknown as TVShow
            return (
                <>
                    <ShowCard 
                    show={show}
                    action={(show: TVShow) => {
                        return <AddToFavouritesIconSeries {...show} />
                    }}
                />
                </>
            );

        case "person": 
            const actor = result as unknown as Person
            return (
                <>
                    <ActorCard 
                        actor={actor}
                        action={(actor: Person) => {
                            return <AddToFavouritesIconActors {...actor} />
                        }}
                />
                </>
            );
    }

  }

  
  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    {data && data.results && data.results.length > 0 ? (
        <Grid item container spacing={1}>
            {data.results.map((result) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={result.id}>
                    {searchResult(result)}
                </Grid>
            ))}
        </Grid>
    ) : (
        <p> No results</p>
    )}
    </ThemeProvider>
    </>
  );
};
export default SearchPage;