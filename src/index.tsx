import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import PopularMoviesPage from "./pages/popularMoviesPage"
import SimilarMoviesPage from "./pages/similarMoviesPage"
import SimilarSeriesPage from "./pages/similarSeriesPage"
import MovieReviewPage from "./pages/movieReviewPage";
import ShowReviewPage from "./pages/showReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import ActorsPage from "./pages/actorsPage";
import SeriesPage from "./pages/seriesPage"
import ShowPage from "./pages/showDetailsPage"
import SearchPage from "./pages/searchPage"

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> 
      <MoviesContextProvider>
      <Routes>
        <Route path="/reviews/form" element={<AddMovieReviewPage isDarkMode={isDarkMode}/>} />
        <Route path="/search/:searchValue" element={<SearchPage isDarkMode={isDarkMode}/>} />
        <Route path="/reviews/:id" element={<MovieReviewPage isDarkMode={isDarkMode}/>} />
        <Route path="/reviews/series/:id" element={<ShowReviewPage isDarkMode={isDarkMode}/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage isDarkMode={isDarkMode}/>} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage isDarkMode={isDarkMode}/> } />
        <Route path="/movies/popular" element={<PopularMoviesPage isDarkMode={isDarkMode}/>}/>
        <Route path="/actors" element={<ActorsPage isDarkMode={isDarkMode}/>}/>
        <Route path="/actors/:id" element={<ActorPage isDarkMode={isDarkMode}/>} />
        <Route path="/movies/:id" element={<MoviePage isDarkMode={isDarkMode}/>} />
        <Route path="/shows/:id" element={<ShowPage isDarkMode={isDarkMode}/>} />
        <Route path="/movies/similar/:id" element= {<SimilarMoviesPage isDarkMode={isDarkMode}/>} />
        <Route path="/series/similar/:id" element={<SimilarSeriesPage isDarkMode={isDarkMode}/>} />
        <Route path="/series" element = {<SeriesPage isDarkMode={isDarkMode}/>} />
        <Route path="/" element={<HomePage isDarkMode={isDarkMode}/>} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
