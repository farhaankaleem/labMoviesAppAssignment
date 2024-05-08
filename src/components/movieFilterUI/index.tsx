import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import FilterIcon from '@mui/icons-material/Filter';
import Drawer from "@mui/material/Drawer";
import { ListedMovie, SortOption } from "../../types/interfaces";

export const titleFilter = function (movie: ListedMovie, value: string) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: ListedMovie, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
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
  }
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  onSortChange: (sortOption: SortOption) => void;
  titleFilter: string;
  genreFilter: string;
  sortOption: SortOption; 
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, onSortChange, titleFilter, genreFilter, sortOption }) => {
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
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          sortOption={sortOption}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;