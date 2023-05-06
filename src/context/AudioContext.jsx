import { useState, useEffect, createContext } from "react";

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    const storedAudioData = localStorage.getItem("audioData");
    if (storedAudioData) {
      setAudioData(JSON.parse(storedAudioData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("audioData", JSON.stringify(audioData));
  }, [audioData, currentAudio]);

  return (
    <AudioContext.Provider
      value={{
        audioData,
        setAudioData,
        currentAudio,
        setCurrentAudio,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
