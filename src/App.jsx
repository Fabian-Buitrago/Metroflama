import { AudioProvider } from "./context/AudioContext";
import Metronome from "./components/Metronome/Metronome";

const App = () => {
  return (
    <AudioProvider>
      <Metronome />
    </AudioProvider>
  );
};

export default App;
