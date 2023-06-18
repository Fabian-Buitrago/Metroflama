import { useContext } from "react";
import TextField from "@mui/material/TextField";
import { LoadingContext } from "../../context/LoadingContext/LoadingContext";
import * as Tone from "tone";

export const FileInput = ({ name, handleFileChange }) => {
  const { toggleLoading } = useContext(LoadingContext);

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

  // const loadFileChange = async (e) => {
  //   toggleLoading();
  //   const { name, files } = e.target;
  //   const file = files[0];
  //   if (!file) {
  //     toggleLoading();
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = async (fileEvent) => {
  //     const arrayBuffer = await fileEvent.target.result;
  //     Tone.context.decodeAudioData(arrayBuffer).then((audioBuffer) => {
  //       // Calculate the duration of silence at the beginning of the audio
  //       const silenceDuration = getSilenceDuration(audioBuffer);

  //       handleFileChange({
  //         target: {
  //           name,
  //           value: {
  //             buffer: audioBuffer,
  //             silenceDuration: silenceDuration,
  //           },
  //         },
  //       });
  //       toggleLoading();
  //     });
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  const loadFileChange = async (e) => {
    toggleLoading();
    const { name, files } = e.target;
    const file = files[0];
    if (!file) {
      toggleLoading();
      return;
    }

    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      function (directoryEntry) {
        directoryEntry.getDirectory(
          "MiFlamaAudios",
          { create: true },
          function (subDirectoryEntry) {
            subDirectoryEntry.getFile(
              file.name,
              { create: true, exclusive: false },
              function (fileEntry) {
                fileEntry.createWriter(function (writer) {
                  writer.onwriteend = function () {
                    onSuccess(fileEntry, name);
                  };
                  writer.onerror = function (error) {
                    console.error(error);
                  };
                  writer.write(file);
                }, onError);
              },
              onError
            );
          },
          onError
        );
      },
      onError
    );
  };

  const onSuccess = (fileEntry, name) => {
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        const arrayBuffer = this.result;
        Tone.context.decodeAudioData(arrayBuffer).then(async (audioBuffer) => {
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
          toggleLoading();
        });
      };
      reader.readAsArrayBuffer(file);
    }, onError);
  };

  const onError = (error) => {
    toggleLoading();
    console.error(error);
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
