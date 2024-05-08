import React, { useState } from "react";
import FilterCard from "../filterShowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { TVShow, SortOption } from "../../types/interfaces";

export const nameFilter = function (show: TVShow, value: string) {
  return show.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: TVShow, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
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

interface ShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortChange: (sortOption: SortOption) => void;
  nameFilter: string;
  genreFilter: string;
  sortOption: SortOption; 
}


const ShowFilterUI: React.FC<ShowFilterUIProps> = ({ onFilterValuesChange, onSortChange, nameFilter, genreFilter, sortOption }) => {
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
          genreFilter={genreFilter}
          sortOption={sortOption}
        />
      </Drawer>
    </>
  );
};

export default ShowFilterUI;