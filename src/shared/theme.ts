import { createTheme } from "@mui/material/styles";

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7E22CE",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#4f4f4f",
      disabled: "#9e9e9e",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "2.25rem", 
      fontWeight: 700,
      color: "#000000",
    },
    h2: {
      fontSize: "2rem", 
      fontWeight: 700,
      color: "#000000",
    },
    h3: {
      fontSize: "1.75rem", 
      fontWeight: 700,
      color: "#000000",
    },
    h4: {
      fontSize: "1.5rem", 
      fontWeight: 700,
      color: "#000000",
    },
    h5: {
      fontSize: "1.25rem", 
      fontWeight: 600,
      color: "#000000",
    },
    h6: {
      fontSize: "1.125rem", 
      fontWeight: 600,
      color: "#000000",
    },
    subtitle1: {
      fontSize: "1rem", 
      fontWeight: 400,
      color: "#000000",
    },
    subtitle2: {
      fontSize: "0.875rem", 
      fontWeight: 400,
      color: "#000000",
    },
    body1: {
      fontSize: "1rem", 
      fontWeight: 400,
      color: "#000000",
    },
    body2: {
      fontSize: "0.875rem", 
      fontWeight: 400,
      color: "#000000",
    },
    button: {
      fontSize: "1rem", 
      fontWeight: 600,
      color: "#000000",
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7E22CE",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#181818",
      paper: "#242424",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      disabled: "#757575",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "2.25rem", 
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontSize: "2rem", 
      fontWeight: 700,
      color: "#ffffff",
    },
    h3: {
      fontSize: "1.75rem", 
      fontWeight: 700,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.5rem", 
      fontWeight: 700,
      color: "#ffffff",
    },
    h5: {
      fontSize: "1.25rem", 
      fontWeight: 600,
      color: "#ffffff",
    },
    h6: {
      fontSize: "1.125rem", 
      fontWeight: 600,
      color: "#ffffff",
    },
    subtitle1: {
      fontSize: "1rem", 
      fontWeight: 400,
      color: "#ffffff",
    },
    subtitle2: {
      fontSize: "0.875rem", 
      fontWeight: 400,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1.1rem", 
      fontWeight: 400,
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.875rem", 
      fontWeight: 400,
      color: "#ffffff",
    },
    button: {
      fontSize: "1rem", 
      fontWeight: 600,
      color: "#ffffff",
    },
  },
});

export { lightTheme, darkTheme };
