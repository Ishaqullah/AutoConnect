import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { 
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  formContainer: {
    width: '400px',
    padding: theme.spacing(4),
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  formTitle: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  formField: {
    width: '100%',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Example: You might call an authentication API and handle the response
  };

  return (
    <div className={classes.root}>
      <Container className={classes.formContainer}>
        <Typography variant="h4" className={classes.formTitle}>
          Admin Portal Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            className={classes.formField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            className={classes.formField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
