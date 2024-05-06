import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {Person} from "../../types/interfaces";

const RemoveFromFavouritesIcon: React.FC<Person> = (actor) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavouriteActors(actor);
  };

return (
  <IconButton
    aria-label="remove from favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromFavouritesIcon;