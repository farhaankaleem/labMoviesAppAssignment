import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../actorList";
import {  ActorListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate: React.FC<ActorListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5}>
      <MovieList action={props.action} movie={props.movies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;