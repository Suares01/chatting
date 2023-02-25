import { CssBaseline, ThemeProvider } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { queryClient } from "./libs/query-client";
import AppRoutes from "./routes";
import { store } from "./store";
import { theme } from "./styles/theme";

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </ReduxProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
