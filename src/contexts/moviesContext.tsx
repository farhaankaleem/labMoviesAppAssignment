import React, { useState } from "react";
import { ListedMovie, MovieT, Person, Review, TVShow } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    favouriteActors: number[];
    favouriteShows: number[];
    mustWatch: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    addToFavouriteActors: ((actor: Person) => void);
    addToFavouriteShows: ((show: TVShow) => void);
    addToMustWatch: ((movie: ListedMovie) => void);
    removeFromFavouriteActors: ((actor: Person) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    removeFromFavouriteShows: ((show: TVShow) => void);
    addReview: ((movie: MovieT, review: Review) => void);  // NEW
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    favouriteActors: [],
    favouriteShows: [],
    mustWatch: [],
    addToFavourites: (movie) => {movie.id },
    addToFavouriteActors: ((actor) => {actor.id}),
    addToFavouriteShows: ((show) => {show.id} ),
    addToMustWatch: (movie) => {movie.id },
    removeFromFavourites: (movie) => { movie.id},
    removeFromFavouriteActors: (actor) => { actor.id },
    removeFromFavouriteShows: (show) => {show.id},
    addReview: (movie, review) => { movie.id, review},  // NEW
};


export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [favouriteActors, setFavouriteActors] = useState<number[]>([]);
    const [favouriteShows, setFavouriteShows] = useState<number[]>([]);
    const [mustWatch, setmustWatchs] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] ) 

    const addToFavourites = (movie: ListedMovie) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(movie.id)) {
            updatedFavourites.push(movie.id);
        }
        setFavourites(updatedFavourites);
    };

    const addToFavouriteActors = (actor: Person) => {
        let updatedFavouriteActors = [...favouriteActors];
        if (!favouriteActors.includes(actor.id)) {
            updatedFavouriteActors.push(actor.id)
        }
        setFavouriteActors(updatedFavouriteActors);
    }

    const addToFavouriteShows = (show: TVShow) => {
        let updatedFavouriteShows = [...favouriteShows];
        if (!favouriteShows.includes(show.id)) {
            updatedFavouriteShows.push(show.id)
        }
        setFavouriteShows(updatedFavouriteShows);
    }

    const addToMustWatch = (movie: ListedMovie) => {
        let updatedMustwatchs = [...mustWatch];
        if (!mustWatch.includes(movie.id)) {
            updatedMustwatchs.push(movie.id);
        }
        setmustWatchs(updatedMustwatchs);
    };

    const addReview = (movie: MovieT, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    // We will use this function in a later section
    const removeFromFavourites = (movie: ListedMovie) => {
        setFavourites(favourites.filter((mId) => mId !== movie.id));
    };

    const removeFromFavouriteActors = (actor: Person) => {
        setFavouriteActors(favouriteActors.filter((mId) => mId !== actor.id));
    };

    const removeFromFavouriteShows = (show: TVShow) => {
        setFavouriteShows(favouriteShows.filter((mId) => mId !== show.id));
    };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                favouriteActors,
                favouriteShows,
                mustWatch,
                addToFavourites,
                addToFavouriteActors,
                addToFavouriteShows,
                addToMustWatch, 
                removeFromFavourites,
                removeFromFavouriteActors,
                removeFromFavouriteShows,
                addReview
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;