import React, { useState } from "react";
import FilterCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import FilterIcon from '@mui/icons-material/Filter';
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
    marginBottom: 8,
    position: "fixed",
    bottom: 20,
    right: 20,
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
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <FilterIcon />
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