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

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5}>
      <MovieList action={props.action} actor={props.actors} />
      </Grid>
    </Grid>
  );
}
export default ActorListPageTemplate;