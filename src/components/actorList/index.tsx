import React from "react";
import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";
import { Person } from "../../types/interfaces";

interface PersonListProps {
  actor: Person[],
  action: (a: Person) => React.ReactNode;
}

const ActorList: React.FC<PersonListProps> = (props) => {
  const actors=props.actor;
  let movieCards = actors.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Actor key={m.id} actor={m}  action={props.action}/>
    </Grid>
  ));
  return movieCards;
}

  export default ActorList;