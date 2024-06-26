import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getSimilarMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { ListedMovie, PopularMovies, ThemeHeaderProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { useParams } from "react-router-dom";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import useSorting from "../hooks/useSorting";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../util";


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

const SimilarMoviesPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<PopularMovies, Error>(["similar", page],  () => getSimilarMovies(id, page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
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
        const dateA = new Date(a.release_date).getTime();
        const dateB = new Date(b.release_date).getTime();
        return dateB - dateA;
      },
      "release.asc": (a: any, b: any) => {
        console.log("Release Asc")
        const dateA = new Date(a.release_date).getTime();
        const dateB = new Date(b.release_date).getTime();
        return dateA - dateB;
      },
      "name.asc": (a: any, b: any) => {
        console.log("Title Asc")
        return a.title.localeCompare(b.title)
      },
      "name.desc": (a: any, b: any) => {
        console.log("Title Dsc")
        return b.title.localeCompare(a.title)
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
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);
  const sortedMovies = [...displayedMovies].sort(sortFunction);

  return (
    <>
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PageTemplate
        title="Similar Movies"
        movies={sortedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />;
        } } 
        currentPage={data?.page || 0} 
        totalPages={data?.total_pages || 0} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={handleSortChange}
        sortOption={sortOption}
      />
      </ThemeProvider>
    </>
  );
};
export default SimilarMoviesPage;