import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import PopularMoviesPage from "./pages/popularMoviesPage"
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import ActorsPage from "./pages/actorsPage";
import SeriesPage from "./pages/seriesPage"
import ShowPage from "./pages/showDetailsPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader /> 
      <MoviesContextProvider>
      <Routes>
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage/> } />
        <Route path="/movies/popular" element={<PopularMoviesPage/>}/>
        <Route path="/actors" element={<ActorsPage/>}/>
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/shows/:id" element={<ShowPage/>} />
        <Route path="/series" element = {<SeriesPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
