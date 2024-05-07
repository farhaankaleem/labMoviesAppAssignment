import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
      }
};

interface HeaderProps {
    title: string;
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
}

const Header: React.FC<HeaderProps> = ({
    title,
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,}) => {
    
    const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
    const isFav = movies.some((movie) => movie.original_title === title);
    const fav = isFav ? (
    <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
    ) : null

    return (
        <Paper component="div" sx={styles.root}>
            {currentPage > 1 && (
            <IconButton
                aria-label="go back" onClick={onPrevPage} disabled={currentPage === 1}
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>)}
            {fav}
            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            {totalPages > 1 && (
            <Typography variant="body1" component="span">
                Page {currentPage} of {totalPages}
            </Typography>)}
            {currentPage < totalPages && (
            <IconButton
                aria-label="go forward" onClick={onNextPage}
            >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
            )}
        </Paper>
    );
};

export default Header;
