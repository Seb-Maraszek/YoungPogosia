import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Weather from "./components/Weather";
import "fontsource-oswald/500.css";
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";
import "./App.css";
import { createTheme } from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? yellow[600] : yellow[600],
          },
          background: {
            default: prefersDarkMode ? "#303030" : blue[500],
            paper: prefersDarkMode ? "#303030" : yellow[300],
          },
          navbar: {
            background: prefersDarkMode ? blue[500] : blue[500],
          },
          hr: {
            background: prefersDarkMode ? yellow[600] : blue[500],
          },
          text: {
            primary: prefersDarkMode ? '#fff' : '#000'
          },
          secondary: {main: prefersDarkMode ? '#fff' : yellow[600]},
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Weather />
    </ThemeProvider>
  );
}

export default App;
