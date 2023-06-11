import { useRef, useContext, useEffect } from "react";
import * as Tone from "tone";

import { AudioContext } from "../context/AudioContext";

const useAudioPlayer = () => {
  let interval = 0;
  const { setIsPlaying, currentAudio, setDuration, setPosition } =
    useContext(AudioContext);
  const {
    title,
    tempo,
    beatPan,
    timeSignature,
    audioPan,
    audioBuffer,
    beatVolume,
    audioVolume,
    soundStatus,
  } = currentAudio || {};

  useEffect(() => {
    setPosition(0);
    setDuration(0);

    if (currentAudio?.title) {
      startPlayback();
    } else {
      cleanUpToneResources();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [currentAudio]);

  const synthRef = useRef(null);
  const loopRef = useRef(null);
  const playerRef = useRef(null);
  const beatPannerRef = useRef(null);
  const audioPannerRef = useRef(null);
  const samplerRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  const cleanUpToneResources = () => {
    if (!loopRef.current) return;
    Tone.Transport.stop();

    playerRef.current.stop().unsync();
    playerRef.current.dispose();
    playerRef.current = null;

    synthRef.current.dispose();
    synthRef.current = null;

    beatPannerRef.current.dispose();
    beatPannerRef.current = null;

    audioPannerRef.current.dispose();
    audioPannerRef.current = null;

    loopRef.current.dispose();
    loopRef.current = null;

    samplerRef.current.dispose();
    samplerRef.current = null;

    speechSynthesisRef.current = null;
  };

  const activateAudioInBrowsers = () => {
    samplerRef.current = new Tone.Sampler();
    samplerRef.current.context._context.resume();
  };

  const startPlayback = async () => {
    cleanUpToneResources();
    activateAudioInBrowsers();

    setIsPlaying(true);
    beatPannerRef.current = new Tone.Panner(beatPan).toDestination();
    audioPannerRef.current = new Tone.Panner(audioPan).toDestination();

    const newSynth = new Tone.Synth({
      oscillator: { type: "sine" }, //sine - square
      envelope: { attack: 0.005, decay: 0.01, sustain: 0, release: 0.1 },
    }).connect(beatPannerRef.current);

    const newPlayer = new Tone.Player().connect(audioPannerRef.current);

    synthRef.current = newSynth;
    playerRef.current = newPlayer;
    synthRef.current.volume.value = beatVolume;
    playerRef.current.volume.value = audioVolume;

    const [beats, subdivision] = timeSignature.split("/").map(Number);
    Tone.Transport.bpm.value = Number(tempo);

    //loop
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

    loopRef.current = newLoop;

    if (!speechSynthesisRef.current) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance();
      speechSynthesisRef.current.lang = "es-ES";
      speechSynthesisRef.current.text = title;
    }

    window.speechSynthesis.speak(speechSynthesisRef.current);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    Tone.Transport.start();

    if (soundStatus === "on") {
      playerRef.current.buffer.set(audioBuffer.buffer);
      playerRef.current
        .sync()
        .start(Tone.Time("2:0"), audioBuffer.silenceDuration);

      setDuration(playerRef?.current?.buffer.duration);

      interval = setInterval(() => {
        if (
          Math.round(Tone.Transport.seconds) <=
          playerRef?.current?.buffer.duration
        ) {
          setPosition(Tone.Transport.seconds);
        }
      }, 500);
    }
  };

  const resumePlayback = () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    Tone.Transport.start();
  };

  const pausePlayback = () => {
    Tone.Transport.pause();
  };

  const handleSeek = (e, newValue) => {
    const seek = newValue;
    Tone.Transport.seconds = seek;
    setPosition(Math.round(seek));
  };

  return {
    startPlayback,
    pausePlayback,
    resumePlayback,
    handleSeek,
  };
};

export default useAudioPlayer;
