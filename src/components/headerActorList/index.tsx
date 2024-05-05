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
    name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    const title = props.name

    //const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
    const isFav = false //movies.some(movie => movie.original_title === title);
    const fav = isFav ? (
    <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
    ) : null

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back"
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            {fav}
            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"
            >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;
