import { useContext } from "react";
import useAudioPlayer from "./useAudioPlayer";
import { AudioContext } from "../context/AudioContext";

const useMetronome = () => {
  const { isPlaying, setIsPlaying } = useContext(AudioContext);
  const { startPlayback, stopPlayback } = useAudioPlayer();

  const handleClick = () => {
    // if (!isPlaying) {
    setIsPlaying(false);
    stopPlayback();
    startPlayback();
    // } else {
    //   setIsPlaying(false);
    //   stopPlayback();
    // }
  };

  return {
    isPlaying,
    setIsPlaying,
    handleClick,
  };
};

export default useMetronome;
