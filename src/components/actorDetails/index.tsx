import React from "react";
import Typography from "@mui/material/Typography";
import { PersonDetails } from "../../types/interfaces";



const ActorDetails: React.FC<PersonDetails> = (props) => {
  const actor=props;

    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>
        </>
    );
};
export default ActorDetails;