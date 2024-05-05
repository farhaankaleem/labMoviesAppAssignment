import React from "react";
import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";
import { Person } from "../../types/interfaces";

interface PersonListProps {
  movies: Person[],
  action: (m: Person) => React.ReactNode;
}

const ActorList: React.FC<PersonListProps> = (props) => {
  const movies=props.movie;
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Actor key={m.id} movie={m}  action={props.action}/>
    </Grid>
  ));
  return movieCards;
}

  export default ActorList;