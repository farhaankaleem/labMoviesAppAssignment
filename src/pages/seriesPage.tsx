import React, { useState } from "react";
import PageTemplate from "../components/templateSeriesListPage";
import { getTVShows } from "../api/tmdb-api";
import { DiscoverTVShows, TVShow } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesSeries'


const SeriesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(["discoverTVShow", page], () => getTVShows(page));

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

  const shows = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title="Discover TV Shows"
        shows={shows}
        action={(movie: TVShow) => {
          return <AddToFavouritesIcon {...movie} />
        }}
        currentPage={data?.page || 0} 
        totalPages={data?.total_pages || 0} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage}
      />
    </>
  );
};
export default SeriesPage;