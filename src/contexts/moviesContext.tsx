import React, { useState } from "react";
import { ListedMovie, MovieT, Person, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    favouriteActors: number[];
    mustWatch: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    addToFavouriteActors: ((actor: Person) => void);
    addToMustWatch: ((movie: ListedMovie) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    addReview: ((movie: MovieT, review: Review) => void);  // NEW
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    favouriteActors: [],
    mustWatch: [],
    addToFavourites: (movie) => {movie.id },
    addToFavouriteActors: ((actor) => {actor.id}),
    addToMustWatch: (movie) => {movie.id },
    removeFromFavourites: (movie) => { movie.id},
    addReview: (movie, review) => { movie.id, review},  // NEW
};


export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [favouriteActors, setFavouriteActors] = useState<number[]>([]);
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

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                favouriteActors,
                mustWatch,
                addToFavourites,
                addToFavouriteActors,
                addToMustWatch, 
                removeFromFavourites,
                addReview
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;