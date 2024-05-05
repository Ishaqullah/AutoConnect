import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { useContext } from 'react';
import { baselightTheme } from "./theme/DefaultColors";
import { AuthContext } from './context/AuthContext';
import "./style.css";
function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const  currentAdmin  = useContext(AuthContext);
  console.log("The details of current admin logged in",currentAdmin)
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}

    </ThemeProvider>
  );
}

export default App;
