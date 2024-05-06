import React from "react";
import Show from "../showCard/";
import Grid from "@mui/material/Grid";
import { TVShow } from "../../types/interfaces";

interface ShowListProps {
  shows: TVShow[],
  action: (m: TVShow) => React.ReactNode;
}

const ShowList: React.FC<ShowListProps> = (props) => {
  const shows=props.shows;
  let showCards = shows.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Show key={m.id} show={m}  action={props.action}/>
    </Grid>
  ));
  return showCards;
}

  export default ShowList;