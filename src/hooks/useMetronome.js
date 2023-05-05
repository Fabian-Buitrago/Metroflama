import { useState, useEffect, useContext } from "react";
import useAudioPlayer from "./useAudioPlayer";
import { MetronomeContext } from "../context/MetronomeContext";

const useMetronome = () => {
  const [tempo, setTempo] = useState(120);
  const [timeSignature, setTimeSignature] = useState("4/4");

  const { startPlayback, stopPlayback, updateLoop } = useAudioPlayer();
  const { isPlaying, setIsPlaying } = useContext(MetronomeContext);

  useEffect(() => {
    updateLoop(tempo, timeSignature);
  }, [tempo, timeSignature, updateLoop]);

  const handleClick = () => {
    if (!isPlaying) {
      startPlayback();
    } else {
      stopPlayback();
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    tempo,
    setTempo,
    timeSignature,
    setTimeSignature,
    handleClick,
  };
};

export default useMetronome;
