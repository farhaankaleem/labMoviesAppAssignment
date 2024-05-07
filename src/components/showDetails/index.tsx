import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TVShowDetails, CastMember } from "../../types/interfaces";
import Stack from "@mui/material/Stack";
import { Avatar, Box, CardActionArea, CardHeader, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

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

interface ShowDetailsProps {
    show: TVShowDetails;
    cast: CastMember[];
  }

const ShowDetails: React.FC<ShowDetailsProps> = (props) => {
  const show=props.show;
  const cast=props.cast;

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {show.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {show.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${show.episode_run_time} min.`} />
                <Chip
                    icon={<StarRate />}
                    label={`${show.vote_average} (${show.vote_count}`}
                />
                <Chip label={`Released: ${show.first_air_date}`} />
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
            <Paper variant="outlined" sx={styles.chipSet}>
                <Chip label="Similar Shows" sx={styles.chipLabel} color="primary" />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Link to={`/series/similar/${show.id}`}>
                        Go to similar shows...
                    </Link>
                </Stack>
            </Paper>
            {/* <Fab    
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
      </Drawer> */}
        </>
    );
};
export default ShowDetails;