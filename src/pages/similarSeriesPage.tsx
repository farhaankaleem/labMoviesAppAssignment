import React from "react";
import PageTemplate from "../components/templateSeriesListPage";
import { getSimilarSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverTVShows } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { useParams } from "react-router-dom";


// const titleFiltering = {
//   name: "title",
//   value: "",
//   condition: titleFilter,
// };
// const genreFiltering = {
//   name: "genre",
//   value: "0",
//   condition: genreFilter,
// };

const SimilarSeriesPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("similar Series", () => getSimilarSeries(id));
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

  const movies = data ? data.results : [];
  //const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Similar Series"
        shows={movies}
        action={() => null}
      />
      {/* <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      /> */}
    </>
  );
};
export default SimilarSeriesPage;