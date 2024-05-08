import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { MovieT, ThemeHeaderProps } from "../types/interfaces";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../util";

const WriteReviewPage: React.FC<ThemeHeaderProps> = ({isDarkMode}) => {
    const location = useLocation()
    const { movieId } = location.state;
    const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
        ["movie", movieId],
        () => getMovie(movieId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {movie ? (
                    <PageTemplate movie={movie}>
                        <ReviewForm {...movie} />
                    </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
            </ThemeProvider>
        </>
    );
};

export default WriteReviewPage;