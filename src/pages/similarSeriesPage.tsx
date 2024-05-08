import React, { useState } from "react";
import PageTemplate from "../components/templateSeriesListPage";
import { getSimilarSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/showFilterUI";
import { DiscoverTVShows, TVShow, ThemeHeaderProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { useParams } from "react-router-dom";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritesSeries";
import useSorting from "../hooks/useSorting";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../util";


const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const SimilarSeriesPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(["similar Series", page], () => getSimilarSeries(id, page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
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
      "rating.desc": (a: any, b: any) => {
        console.log("Rating Desc")
        return b.vote_average - a.vote_average
      },
      "rating.asc": (a: any, b: any) => {
        console.log("Rating Asc")
        return a.vote_average - b.vote_average
      },
      "release.desc": (a: any, b: any) => {
        console.log("Release Desc")
        const dateA = new Date(a.first_air_date).getTime();
        const dateB = new Date(b.first_air_date).getTime();
        return dateB - dateA;
      },
      "release.asc": (a: any, b: any) => {
        console.log("Release Asc")
        const dateA = new Date(a.first_air_date).getTime();
        const dateB = new Date(b.first_air_date).getTime();
        return dateA - dateB;
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

  const shows = data ? data.results : [];
  const displayedShows = filterFunction(shows);
  const sortedShows = [...displayedShows].sort(sortFunction);

  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PageTemplate
        title="Similar Series"
        shows={sortedShows}
        action={(movie: TVShow) => {
          return <AddToFavouritesIcon {...movie} />
        }}
        currentPage={data?.page || 0} 
        totalPages={data?.total_pages || 0} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage}
      />
      
      <ShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={handleSortChange}
        sortOption={sortOption}
      />
      </ThemeProvider>
    </>
  );
};
export default SimilarSeriesPage;