import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmEmail } from '../api/dynamodb-api';
import { signin } from '../types/interfaces';

const styles = {
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 1,
    backgroundColor: '#1976d2', 
  },
  form: {
    width: '100%', 
    marginTop: 8, 
  },
  submit: {
    margin: '24px 0 16px', 
  },
};


export default function ConfirmEmail() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin');
      };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
        const payload: signin = {
            userName: username,
            password: password
        }

        const response = await confirmEmail(payload)
        if (response) {
            navigate('/signin');
        } else {
            // Handle error cases
            console.error('Error:', response.statusText);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Confirm Email
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="code"
            label="Code"
            type="code"
            id="code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="code"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
           Confirm Email
          </Button>
          <Grid container>
            <Grid item>
            <span onClick={handleSignInClick} 
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                Already have an account? Sign in
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}