import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header 
          title={props.title}
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          onPrevPage={props.onPrevPage}
          onNextPage={props.onNextPage}
         />
      </Grid>
      <Grid item container spacing={5}>
      <MovieList action={props.action} movies={props.movies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;