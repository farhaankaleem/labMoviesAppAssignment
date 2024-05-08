import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateSeriesPage";
import MovieReview from "../components/movieReview";

const ShowReviewPage: React.FC = () => {
  const { state : {movie, review } } = useLocation()
  return (
    <PageTemplate show={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default ShowReviewPage;