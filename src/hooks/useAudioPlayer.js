import { useEffect, useRef, useContext } from "react";
import * as Tone from "tone";

import { MetronomeContext } from "../context/MetronomeContext";
import { BUFFER_MESSAGE_ERROR } from "../constants";

const useAudioPlayer = () => {
  const {
    playerBuffer,
    setPlayerBuffer,
    songName,
    audioPan,
    setAudioPan,
    beatPan,
    setBeatPan,
    audioVolume,
    setAudioVolume,
    beatVolume,
    setBeatVolume,
    setIsPlaying,
  } = useContext(MetronomeContext);

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
    updatePannerValue(beatPannerRef.current, beatPan);
  }, [beatPan]);

  useEffect(() => {
    updatePannerValue(audioPannerRef.current, audioPan);
  }, [audioPan]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = beatVolume;
    }
  }, [beatVolume]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume.value = audioVolume;
    }
  }, [audioVolume]);

  const initToneResources = () => {
    beatPannerRef.current = new Tone.Panner(beatPan).toDestination();
    audioPannerRef.current = new Tone.Panner(audioPan).toDestination();

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

  const updatePannerValue = (panner, value) => {
    if (panner) {
      panner.pan.value = value;
    }
  };

  const updateLoop = (tempo, timeSignature) => {
    if (!tempo || !timeSignature || !synthRef.current) return;
    Tone.Transport.bpm.value = tempo;

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
    loopRef.current = newLoop;
  };

  const activateAudioInBrowsers = () => {
    const sampler = new Tone.Sampler();
    sampler.context._context.resume();
  };

  const startPlayback = async () => {
    if (playerBuffer) {
      activateAudioInBrowsers();
      playerRef.current.buffer.set(playerBuffer.buffer);
      if (!speechSynthesis.current) {
        speechSynthesis.current = new SpeechSynthesisUtterance();
        speechSynthesis.current.lang = "es-ES";
        speechSynthesis.current.text = songName;
      }
      window.speechSynthesis.speak(speechSynthesis.current);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      playerRef.current
        .sync()
        .start(Tone.Time("2:0"), playerBuffer.silenceDuration);
      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      alert(BUFFER_MESSAGE_ERROR);
    }
  };

  const stopPlayback = () => {
    Tone.Transport.stop();
    playerRef.current.stop().unsync();
  };

  const getSilenceDuration = (audioBuffer, threshold = 0.01) => {
    const numberOfChannels = audioBuffer.numberOfChannels;
    let startOffset = 0;

    outerLoop: for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        if (Math.abs(audioBuffer.getChannelData(channel)[i]) > threshold) {
          startOffset = i;
          break outerLoop;
        }
      }
    }

    const silenceDuration = startOffset / audioBuffer.sampleRate;
    return silenceDuration;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (fileEvent) => {
      const arrayBuffer = await fileEvent.target.result;
      Tone.context.decodeAudioData(arrayBuffer).then((audioBuffer) => {
        // Calculate the duration of silence at the beginning of the audio
        const silenceDuration = getSilenceDuration(audioBuffer);

        setPlayerBuffer({
          buffer: audioBuffer,
          silenceDuration: silenceDuration,
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return {
    startPlayback,
    stopPlayback,
    updateLoop,
    beatVolume,
    setBeatVolume,
    audioVolume,
    setAudioVolume,
    beatPan,
    setBeatPan,
    audioPan,
    setAudioPan,
    playerRef,
    handleFileChange,
  };
};

export default useAudioPlayer;
