import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

import { MovieT, Review } from "../../types/interfaces"; // Import the MovieT type from the appropriate location
import { getDynamoMovieReviews } from "../../api/dynamodb-api";

const styles = {
    table: {
        minWidth: 550,
    },
};

const MovieReviews: React.FC<MovieT> = (props) => { // Use the MovieT type in the function signature
    const [reviews, setReviews] = useState<Review[]>([]);

    const movie = props;
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews1 = await getMovieReviews(movie.id);
                setReviews(reviews1);

                const reviews2 = await getDynamoMovieReviews(movie.id);
                const rev2 = reviews2.data
                setReviews((prevReviews) => [...prevReviews, ...rev2]); // Append reviews from the second source
            } catch (error) {
                console.error('Error fetching movie reviews:', error);
            }
        };
        fetchReviews();
    }, [movie.id]); 

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((r: Review) => (
                        <TableRow key={r.id}>
                            <TableCell component="th" scope="row">
                                {r.author ? r.author : r.reviewerName}
                            </TableCell>
                            <TableCell >{excerpt(r.content)}</TableCell>
                            <TableCell >
                                <Link
                                    to={`/reviews/${r.id}`}
                                    state={{
                                        review: r,
                                        movie: movie,
                                    }}
                                >
                                    Full Review
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MovieReviews;