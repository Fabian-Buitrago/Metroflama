import { createContext, useState } from "react";

export const MetronomeContext = createContext();

export const MetronomeProvider = ({ children }) => {
  const [beatVolume, setBeatVolume] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0);
  const [beatPan, setBeatPan] = useState(-1);
  const [audioPan, setAudioPan] = useState(1);
  const [playerBuffer, setPlayerBuffer] = useState(null);
  const [songName, setSongName] = useState("Cancion por defecto");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MetronomeContext.Provider
      value={{
        playerBuffer,
        setPlayerBuffer,
        songName,
        setSongName,
        audioPan,
        setAudioPan,
        beatPan,
        setBeatPan,
        audioVolume,
        setAudioVolume,
        beatVolume,
        setBeatVolume,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};
