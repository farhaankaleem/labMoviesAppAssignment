import React, { useState } from "react";
import PageTemplate from "../components/templateActorListPage";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
  genderFilter,
} from "../components/actorFilterUI";
import { Person, PersonList, ThemeHeaderProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesActors'
import useSorting from "../hooks/useSorting";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../util";


const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};
const genderFiltering = {
  name: "gender",
  value: "1",
  condition: genderFilter,
};

const ActorsPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<PersonList, Error>(["actors", page], () => getActors(page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genderFiltering]
  );
  const { sortOption, handleSortChange, sortFunction } = useSorting(
    { name: "Popularity Descending", value: "popularity.desc" },
    {
      "popularity.desc": (a: any, b: any) => {
        console.log("Popularity Desc")
        return b.popularity - a.popularity
      },
      "popularity.asc": (a: any, b: any) => {
        console.log("Popularity Asc")
        return a.popularity - b.popularity
      },
      "name.asc": (a: any, b: any) => {
        console.log("Title Asc")
        return a.name.localeCompare(b.name)
      },
      "name.desc": (a: any, b: any) => {
        console.log("Title Dsc")
        return b.name.localeCompare(a.name)
      }
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(Math.max(page - 1, 1));
  };


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const actors = data ? data.results : [];
  const displayedMovies = filterFunction(actors);
  const sortedMovies = [...displayedMovies].sort(sortFunction);

  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PageTemplate
        title="Actors"
        actors={sortedMovies}
        action={(actor: Person ) => {
            return <AddToFavouritesIcon {...actor} />
          }}
        currentPage={data?.page || 0} 
        totalPages={data?.total_pages || 0} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage}
      />
      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genderFilter={filterValues[1].value}
        onSortChange={handleSortChange}
        sortOption={sortOption}
      />
      </ThemeProvider>
    </>
  );
};
export default ActorsPage;