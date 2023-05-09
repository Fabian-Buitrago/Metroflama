import { AudioProvider } from "./context/AudioContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import Metronome from "./components/Metronome/Metronome";

const App = () => {
  return (
    <AudioProvider>
      <SnackbarProvider>
        <Metronome />
      </SnackbarProvider>
    </AudioProvider>
  );
};

export default App;
