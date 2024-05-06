import React from "react";
import Typography from "@mui/material/Typography";
import { PersonDetails } from "../../types/interfaces";

const styles = {
    container: {
      padding: '16px', 
    },
    section: {
        marginBottom: '24px',
      },
    imdbLink: {
      color: '#1976d2', 
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

const ActorDetails: React.FC<PersonDetails> = (props) => {
  const actor=props;


  const handleClickIMDb = () => {
    window.open(`https://www.imdb.com/name/${actor.imdb_id}`, '_blank');
  };
  return (
    <div style={styles.container}>
     <section style={styles.section}>
        {actor.biography && (
            <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>
            <Typography variant="body1">
                {actor.biography}
            </Typography>
            </>
        )}
      </section>


      <section style={styles.section}>
        <Typography variant="h5" component="h3">
          Personal Details
        </Typography>
        <Typography variant="body1">
          <span style={styles.imdbLink} onClick={handleClickIMDb}>IMDb ID: {actor.imdb_id}</span>
        </Typography>
        <Typography variant="body1">
          Gender: {actor.gender === 1 ? 'Female' : 'Male'}
        </Typography>
        
        {actor.known_for_department && (
            <Typography variant="body1">
                Known For: {actor.known_for_department}
            </Typography>
            )}

        {actor.popularity && (
        <Typography variant="body1">
          Popularity: {actor.popularity}
        </Typography>)}


        {actor.birthday && (
        <Typography variant="body1">
          Birthday: {actor.birthday}
        </Typography>)}


        {actor.place_of_birth && (
        <Typography variant="body1">
          Place of Birth: {actor.place_of_birth}
        </Typography>)}


        {actor.also_known_as[2] && (
        <Typography variant="body1">
          Also Known as: {actor.also_known_as[2]}
        </Typography>)}


      </section>
    </div>
  );
};

export default ActorDetails;