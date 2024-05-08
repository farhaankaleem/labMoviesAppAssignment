import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../util";
import { ThemeHeaderProps } from "../types/interfaces";

const MovieReviewPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const { state : {movie, review } } = useLocation()
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
    </ThemeProvider>
  );
};

export default MovieReviewPage;