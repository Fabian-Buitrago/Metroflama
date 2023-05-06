import { useState, useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { TempoControl } from "../TempoControl";
import { TimeSignatureControl } from "../TimeSignatureControl";
import { PanControl } from "../PanControl";
import { VolumeControl } from "../VolumeControl";
import { FileInput } from "../FileInput";
import { AudioContext } from "../../context/AudioContext";
import useMetronome from "../../hooks/useMetronome";

const SongItem = ({ song, index }) => {
  const { audioData, setAudioData, setCurrentAudio } = useContext(AudioContext);
  const [songInfo, setSongInfo] = useState(song);
  const [expanded, setExpanded] = useState(false);

  const { handleClick } = useMetronome();

  const {
    title,
    tempo,
    beatVolume,
    beatPan,
    timeSignature,
    audioVolume,
    audioPan,
  } = songInfo;

  const updateSong = (e, fileValue) => {
    const { name, value } = e.target;
    setSongInfo({ ...songInfo, [name]: fileValue ? fileValue : value });
  };

  const deleteSong = () => {
    const newAudioData = [...audioData];
    newAudioData.splice(index, 1);
    setAudioData(newAudioData);
  };

  const updateSongs = () => {
    const updatedObj = { ...audioData[index], songInfo };
    const updatedData = [...audioData];
    updatedData[index] = updatedObj;
    setAudioData(updatedData);
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        onClick={() => {
          handleClick();
          setCurrentAudio(songInfo);
        }}
        expandIcon={
          <ExpandMoreIcon
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          />
        }
      >
        <AudiotrackIcon sx={{ marginRight: 2 }} />
        <Typography sx={{ marginRight: 2, textTransform: "capitalize" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          name="title"
          label="Song Name"
          variant="outlined"
          onChange={updateSong}
          autoFocus
          defaultValue={title}
        />

        {/* Beat */}
        <VolumeControl
          name="beatVolume"
          label="Beat"
          volume={beatVolume}
          handleChange={updateSong}
        />
        <TempoControl name="tempo" tempo={tempo} setTempo={updateSong} />
        <TimeSignatureControl
          name="timeSignature"
          timeSignature={timeSignature}
          setTimeSignature={updateSong}
        />
        <PanControl
          name="beatPan"
          label="Beat"
          pan={beatPan}
          handleChange={updateSong}
        />

        {/* Audio */}
        <VolumeControl
          name="audioVolume"
          label="Audio"
          volume={audioVolume}
          handleChange={updateSong}
        />
        <PanControl
          name="audioPan"
          label="Audio"
          pan={audioPan}
          handleChange={updateSong}
        />
        <FileInput name="audioBuffer" handleFileChange={updateSong} />

        <Button
          variant="outlined"
          onClick={() => {
            setExpanded(!expanded);
            updateSongs();
          }}
        >
          Update
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setExpanded(!expanded);
            deleteSong();
          }}
        >
          Delete
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default SongItem;
