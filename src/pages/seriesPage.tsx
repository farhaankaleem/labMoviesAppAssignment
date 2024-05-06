import React from "react";
import PageTemplate from "../components/templateSeriesListPage";
import { getTVShows } from "../api/tmdb-api";
import { DiscoverTVShows, TVShow } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritesSeries'


const SeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("discoverTVShow", getTVShows);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const shows = data ? data.results : [];

  return (
    <>
      <PageTemplate
        title="Discover TV Shows"
        shows={shows}
        action={(movie: TVShow) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
    </>
  );
};
export default SeriesPage;