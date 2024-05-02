import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieList } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieList> = (props) => {
  const movies=props.movies;
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} {...m}  selectFavourite={props.selectFavourite}/>
    </Grid>
  ));
  return movieCards;
}

interface MovieListProps extends BaseMovieList {
  selectFavourite: (movieId: number) => void;
}

  export default MovieList;