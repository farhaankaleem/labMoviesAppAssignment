import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateSeriesPage";
import MovieReview from "../components/movieReview";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../util";
import { ThemeHeaderProps } from "../types/interfaces";

const ShowReviewPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
  const { state : {movie, review } } = useLocation()
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <PageTemplate show={movie}>
      <MovieReview {...review} />
    </PageTemplate>
    </ThemeProvider>
  );
};

export default ShowReviewPage;