import React, {useContext} from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { TVShow } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface ShowListProps {
  show:TVShow,
  action: (m: TVShow) => React.ReactNode;
}

const ShowCard: React.FC<ShowListProps> = (props) => {

  // @ts-ignore
  const { show: originalMovie, action } = props;

  const show: TVShow = { ...originalMovie, favourite: false };

  // @ts-ignore
  const { favouriteShows, addToFavouriteShows } = useContext(MoviesContext);
  
  if (favouriteShows.find((id) => id === show.id)) 
    show.favourite = true;
 

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          show.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {show.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {show.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {show.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {props.action(show)}
        <Link to={`/shows/${show.id}`}>
         <IconButton color="primary" aria-label="info">
            <InfoIcon fontSize="large"/>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}

export default ShowCard;
