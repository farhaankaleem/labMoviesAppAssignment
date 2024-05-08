import React, { useState } from "react";
import FilterCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { Person, SortOption } from "../../types/interfaces";

export const nameFilter = function (actor: Person, value: string) {
  return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genderFilter = function (actor: Person, value: string) {
  const genderValue = Number(value);
  return genderValue > 0 ? actor.gender === genderValue : true;
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface ActorFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortChange: (sortOption: SortOption) => void;
  nameFilter: string;
  genderFilter: string;
  sortOption: SortOption; 
}


const MovieFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, onSortChange, nameFilter, genderFilter, sortOption }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          onSortChange={onSortChange}
          nameFilter={nameFilter}
          genderFilter={genderFilter}
          sortOption={sortOption}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;