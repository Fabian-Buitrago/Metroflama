import { useContext } from "react";
import useAudioPlayer from "./useAudioPlayer";
import { AudioContext } from "../context/AudioContext";

const useMetronome = () => {
  const { isPlaying, setIsPlaying } = useContext(AudioContext);
  const { pausePlayback, resumePlayback } = useAudioPlayer();

  const handleControl = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      resumePlayback();
    } else {
      setIsPlaying(false);
      pausePlayback();
    }
  };

  return {
    isPlaying,
    setIsPlaying,
    handleControl,
  };
};

export default useMetronome;
