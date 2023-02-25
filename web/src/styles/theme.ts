import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222e35",
      paper: "#111B21",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        "::-webkit-scrollbar": {
          width: "0.5em",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(174, 186, 193, 0.3)",
          opacity: 0.5,
        },
      }),
    },
  },
});
