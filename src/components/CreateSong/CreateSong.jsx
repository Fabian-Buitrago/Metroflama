import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";

import styles from "./createSong.module.css";
import { AudioContext } from "../../context/AudioContext";

export const CreateSong = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const { audioData, setAudioData } = useContext(AudioContext);

  const handleSong = (e) => {
    if (e.key.toLowerCase() === "enter" && title) {
      const audioInput = {
        id: uuid(),
        title,
        timeSignature: "4/4",
        audioBuffer: null,
        audioVolume: 0,
        audioDisabled: false,
        audioPan: 1,
        tempo: 120,
        beatPan: -1,
        beatVolume: 0,
      };
      onClose();
      setAudioData([...audioData, audioInput]);
    }
  };

  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label="Song Name"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleSong}
        autoFocus
      />
    </div>
  );
};
