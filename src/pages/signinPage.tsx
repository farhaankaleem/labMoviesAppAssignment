import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import { signin } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';
import { getDynamoToken } from '../api/dynamodb-api';
import { useState } from 'react';

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


export default function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const payload: signin = {
          userName: username,
          password: password
      }

      const response = await getDynamoToken(payload)
      if (response) {
        // If the response is successful, navigate to the confirm email page
        navigate('/');
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
          Sign in
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
            <span onClick={handleSignUpClick} 
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {"Don't have an account? Sign Up"}
            </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

