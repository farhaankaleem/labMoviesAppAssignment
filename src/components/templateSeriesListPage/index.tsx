import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ShowList from "../TVShowList";
import {  SeriesListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const SeriesListPageTemplate: React.FC<SeriesListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header 
          title={props.title}
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          onPrevPage={props.onPrevPage}
          onNextPage={props.onNextPage} />
      </Grid>
      <Grid item container spacing={5}>
      <ShowList action={props.action} shows={props.shows} />
      </Grid>
    </Grid>
  );
}
export default SeriesListPageTemplate;