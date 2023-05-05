import useMetronome from "../../hooks/useMetronome";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { PlaybackControls } from "../PlaybackControls";
import { TempoControl } from "../TempoControl";
import { TimeSignatureControl } from "../TimeSignatureControl";
import { PanControl } from "../PanControl";
import { VolumeControl } from "../VolumeControl";
import { FileInput } from "../FileInput";

const Metronome = () => {
  const {
    isPlaying,
    tempo,
    setTempo,
    timeSignature,
    setTimeSignature,
    handleClick,
  } = useMetronome();

  const {
    beatVolume,
    setBeatVolume,
    audioVolume,
    setAudioVolume,
    beatPan,
    setBeatPan,
    audioPan,
    setAudioPan,
    handleFileChange,
  } = useAudioPlayer();

  return (
    <div>
      <PlaybackControls isPlaying={isPlaying} handleClick={handleClick} />
      <TempoControl tempo={tempo} setTempo={setTempo} />
      <TimeSignatureControl
        timeSignature={timeSignature}
        setTimeSignature={setTimeSignature}
      />
      <PanControl label="Beat" pan={beatPan} handleChange={setBeatPan} />
      <PanControl label="Audio" pan={audioPan} handleChange={setAudioPan} />
      <VolumeControl
        label="Beat"
        volume={beatVolume}
        handleChange={setBeatVolume}
      />
      <VolumeControl
        label="Audio"
        volume={audioVolume}
        handleChange={setAudioVolume}
      />
      <FileInput handleFileChange={handleFileChange} />
    </div>
  );
};

export default Metronome;
