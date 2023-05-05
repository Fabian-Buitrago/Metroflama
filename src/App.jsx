import { MetronomeProvider } from "./context/MetronomeContext";
import Metronome from "./components/Metronome/Metronome";

const App = () => {
  return (
    <MetronomeProvider>
      <Metronome />
    </MetronomeProvider>
  );
};

export default App;
