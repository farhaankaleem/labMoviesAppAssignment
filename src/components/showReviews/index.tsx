import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getShowReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

import { TVShow, Review } from "../../types/interfaces"; 

const styles = {
    table: {
        minWidth: 550,
    },
};

const ShowReviews: React.FC<TVShow> = (props) => { 
    const [reviews, setReviews] = useState([]);

    const show = props;
    useEffect(() => {
        getShowReviews(show.id).then((reviews) => {
            setReviews(reviews);
        });
    }, []);

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
                                {r.author}
                            </TableCell>
                            <TableCell >{excerpt(r.content)}</TableCell>
                            <TableCell >
                                <Link
                                    to={`/reviews/series/${r.id}`}
                                    state={{
                                        review: r,
                                        movie: show,
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

export default ShowReviews;