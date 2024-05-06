import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieT, CastMember } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import { Avatar, Box, CardActionArea, CardHeader, Stack, Tooltip } from "@mui/material";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: { 
      position: "fixed",
      top: 50,
      right: 2,
    },
};

interface MovieDetailsProps {
    movie: MovieT;
    cast: CastMember[];
  }

const MovieDetails: React.FC<MovieDetailsProps> = (props) => {
  const movie=props.movie;
  const cast=props.cast.cast;
  const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>
            <Paper variant="outlined" sx={styles.chipSet}>
                <Typography variant="h5" component="div">
                    Cast
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {cast.map((member) => {
                        return (<Tooltip 
                            key={member.id}
                            title={`${member.name} as ${member.character}`}
                           >
                            <Box onClick={() => window.location.href = `/actors/${member.id}`}>
                                <CardActionArea>
                                    <CardHeader
                                    avatar={
                                        member.profile_path ? (
                                            <Avatar
                                            alt={member.name}
                                            src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                                            />
                                        ) : null
                                    }
                                    title={<Typography>{member.name}</Typography>}
                                    />
                                </CardActionArea>
                            </Box>

                           </Tooltip>);
                        })}
                </Stack>
            </Paper>
            <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews {...movie} />
      </Drawer>
        </>
    );
};
export default MovieDetails;