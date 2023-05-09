import { AudioProvider } from "./context/AudioContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import Metronome from "./components/Metronome/Metronome";
import { DialogProvider } from "./context/DialogContext";

const App = () => {
  return (
    <AudioProvider>
      <DialogProvider>
        <SnackbarProvider>
          <Metronome />
        </SnackbarProvider>
      </DialogProvider>
    </AudioProvider>
  );
};

export default App;
