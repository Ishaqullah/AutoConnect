import { createTheme } from "@mui/material";



const theme = createTheme({
  palette: {
    secondary: {
      main: "#9D1515",
    },
    primary: {
      main: "#7B7272",
      light: "#969595",
      dark: "#2E2D31",
    },
    success: {
      main: "#42A432",
    },
  },
  typography: {
    fontFamily: '"Maven Pro", sans-serif', // Use "Maven Pro" as the default font
  },
});

export default theme;
