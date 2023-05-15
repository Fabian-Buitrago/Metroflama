import Metronome from "./components/Metronome/Metronome";
import { AudioProvider } from "./context/AudioContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { DialogProvider } from "./context/DialogContext";
import { LoadingProvider } from "./context/LoadingContext/LoadingContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff9566",
      main: "#ff7b40",
      dark: "#b2562c",
      contrastText: "#fff",
    },
    secondary: {
      light: '#ffc76d',
      main: '#ffba49',
      dark: '#b28233',
      contrastText: '#000',
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <AudioProvider>
          <DialogProvider>
            <SnackbarProvider>
              <Metronome />
            </SnackbarProvider>
          </DialogProvider>
        </AudioProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;
