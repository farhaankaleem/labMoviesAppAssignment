import React from "react";
import PageTemplate from "../components/templateActorListPage";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { PersonList } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const ActorsPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<PersonList, Error>("actors", getActors);
//   const { filterValues, setFilterValues, filterFunction } = useFiltering(
//     [],
//     [titleFiltering, genreFiltering]
//   );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


//   const changeFilterValues = (type: string, value: string) => {
//     const changedFilter = { name: type, value: value };
//     const updatedFilterSet =
//       type === "title"
//         ? [changedFilter, filterValues[1]]
//         : [filterValues[0], changedFilter];
//     setFilterValues(updatedFilterSet);
//   };

  const actors = data ? data.results : [];
  //const displayedMovies = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Actors"
        movies={actors}
        action={() => {}}
      />
      {/* <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      /> */}
    </>
  );
};
export default ActorsPage;