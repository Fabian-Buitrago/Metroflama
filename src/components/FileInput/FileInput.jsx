import TextField from "@mui/material/TextField";
import * as Tone from "tone";

export const FileInput = ({ name, handleFileChange }) => {
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

  const loadFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (fileEvent) => {
      const arrayBuffer = await fileEvent.target.result;
      Tone.context.decodeAudioData(arrayBuffer).then((audioBuffer) => {
        // Calculate the duration of silence at the beginning of the audio
        const silenceDuration = getSilenceDuration(audioBuffer);

        handleFileChange({
          target: {
            name,
            value: {
              buffer: audioBuffer,
              silenceDuration: silenceDuration,
            },
          },
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <TextField
      name={name}
      variant="outlined"
      label="Choose a file"
      type="file"
      onChange={loadFileChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        accept: "audio/*",
      }}
    />
  );
};
