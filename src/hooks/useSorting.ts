import { useState } from "react";
import { SortOption } from "../types/interfaces";


const useSorting = (initialSortOption: SortOption, sortFunctions: any) => {
  const [sortOption, setSortOption] = useState(initialSortOption);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const sortFunction = sortFunctions[sortOption.value];

  return {
    sortOption,
    handleSortChange,
    sortFunction,
  };
};

export default useSorting;
