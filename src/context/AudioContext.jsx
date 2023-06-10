import { useState, useEffect, createContext } from "react";
import { isEmpty } from "lodash";

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const storedAudioData = localStorage.getItem("audioData");
    if (storedAudioData) {
      setAudioData(JSON.parse(storedAudioData));
    }
  }, []);

  useEffect(() => {
    // if (isEmpty(audioData)) return;
    localStorage.setItem("audioData", JSON.stringify(audioData));
  }, [audioData]);

  return (
    <AudioContext.Provider
      value={{
        audioData,
        setAudioData,
        currentAudio,
        setCurrentAudio,
        isPlaying,
        setIsPlaying,
        duration,
        setDuration,
        position,
        setPosition,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
