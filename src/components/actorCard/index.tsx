import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Person } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import img from '../../images/film-poster-placeholder.png';
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface ActorListProps {
  actor: Person,
  action: (m: Person) => React.ReactNode;
}

const ActorCard: React.FC<ActorListProps> = (props) => {

  const { actor: originalMovie, action } = props;

  const movie: Person = { ...originalMovie, favourite: false };

  const { favouriteActors, addToFavouriteActors } = useContext(MoviesContext);

  if (favouriteActors.find((id) => id === movie.id))
    movie.favourite = true;


  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.profile_path
            ? `https://image.tmdb.org/t/p/w500/${movie.profile_path}`
            : img
        }
      />
      <CardActions disableSpacing>
        {props.action(movie)}
        <Link to={`/actors/${movie.id}`}>
          <IconButton color="primary" aria-label="info">
            <InfoIcon fontSize="large"/>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ActorCard;
