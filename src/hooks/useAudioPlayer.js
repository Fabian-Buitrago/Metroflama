import { useEffect, useRef, useContext } from "react";
import * as Tone from "tone";

import { AudioContext } from "../context/AudioContext";
import { BUFFER_MESSAGE_ERROR } from "../constants";

const useAudioPlayer = () => {
  const { currentAudio, setIsPlaying } = useContext(AudioContext);
  const {
    title,
    tempo,
    beatPan,
    timeSignature,
    audioPan,
    audioBuffer,
    beatVolume,
    audioVolume,
  } = currentAudio || {};

  const synthRef = useRef(null);
  const loopRef = useRef(null);
  const playerRef = useRef(null);
  const beatPannerRef = useRef(null);
  const audioPannerRef = useRef(null);

  useEffect(() => {
    initToneResources();
    return cleanUpToneResources;
  }, []);

  useEffect(() => {
    if (!currentAudio) return;
    synthRef.current.volume.value = beatVolume;
    playerRef.current.volume.value = audioVolume;
    updatePannerValue(beatPannerRef.current, beatPan);
    updatePannerValue(audioPannerRef.current, audioPan);
  }, [currentAudio]);

  const updatePannerValue = (panner, value) => {
    if (panner) {
      panner.pan.value = value;
    }
  };

  const initToneResources = () => {
    beatPannerRef.current = new Tone.Panner(-1).toDestination();
    audioPannerRef.current = new Tone.Panner(1).toDestination();

    const newSynth = new Tone.Synth({
      oscillator: { type: "sine" }, //sine - square
      envelope: { attack: 0.005, decay: 0.01, sustain: 0, release: 0.1 },
    }).connect(beatPannerRef.current);

    const newPlayer = new Tone.Player()
      .toDestination()
      .connect(audioPannerRef.current);

    synthRef.current = newSynth;
    playerRef.current = newPlayer;
  };

  const cleanUpToneResources = () => {
    synthRef.current.dispose();
    beatPannerRef.current.dispose();
    playerRef.current.dispose();
    audioPannerRef.current.dispose();
    if (loopRef.current) loopRef.current.dispose();
  };

  const updateLoop = () => {
    if (!tempo || !timeSignature || !synthRef.current) return;
    Tone.Transport.bpm.value = Number(tempo);

    const [beats, subdivision] = timeSignature.split("/").map(Number);
    if (loopRef.current) loopRef.current.dispose();

    let beat = 0;
    const newLoop = new Tone.Loop(
      (time) => {
        beat = beat % (beats * subdivision);
        const isDownBeat = beat % subdivision === 0;
        if (isDownBeat) {
          synthRef.current.triggerAttackRelease("C4", "8n", time); // accented note
        } else {
          synthRef.current.triggerAttackRelease("C4", "8n", time); // regular note
        }
        beat++;
      },
      subdivision === 8 ? "8t" : "4n"
    ).start(0);
    console.log({ timeSignature }, "timeSignature8787-----", newLoop);
    loopRef.current = newLoop;
  };

  const activateAudioInBrowsers = () => {
    const sampler = new Tone.Sampler();
    sampler.context._context.resume();
  };

  const startPlayback = async () => {
    if (audioBuffer) {
      updateLoop();
      setIsPlaying(true);
      activateAudioInBrowsers();
      playerRef.current.buffer.set(audioBuffer.buffer);
      if (!speechSynthesis.current) {
        speechSynthesis.current = new SpeechSynthesisUtterance();
        speechSynthesis.current.lang = "es-ES";
        speechSynthesis.current.text = title;
      }
      window.speechSynthesis.speak(speechSynthesis.current);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Tone.Transport.start();
      playerRef.current
        .sync()
        .start(Tone.Time("2:0"), audioBuffer.silenceDuration);
    } else {
      alert(BUFFER_MESSAGE_ERROR);
    }
  };

  const stopPlayback = () => {
    Tone.Transport.stop();
    playerRef.current.stop().unsync();
  };

  return {
    startPlayback,
    stopPlayback,
  };
};

export default useAudioPlayer;
