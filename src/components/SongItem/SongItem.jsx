import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { TempoControl } from "../TempoControl";
import { TimeSignatureControl } from "../TimeSignatureControl";
import { PanControl } from "../PanControl";
import { VolumeControl } from "../VolumeControl";
import { FileInput } from "../FileInput";
import { AudioContext } from "../../context/AudioContext";
import { SoundControl } from "../SoundControl";
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
    soundStatus,
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
        <Grid container spacing={2} sx={{ padding: 5 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" component="h2">
              Beat
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Song Name"
              variant="outlined"
              onChange={updateSong}
              autoFocus
              defaultValue={title}
            />
          </Grid>
          <Grid item xs={6}>
            <TempoControl name="tempo" tempo={tempo} setTempo={updateSong} />
          </Grid>
          <Grid item xs={6}>
            <PanControl
              name="beatPan"
              pan={beatPan}
              handleChange={updateSong}
            />
          </Grid>
          <Grid item xs={6}>
            <TimeSignatureControl
              name="timeSignature"
              timeSignature={timeSignature}
              setTimeSignature={updateSong}
            />
          </Grid>
          <Grid item xs={6}>
            <VolumeControl
              name="beatVolume"
              label="Beat"
              volume={beatVolume}
              handleChange={updateSong}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" component="h2">
              Audio
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FileInput name="audioBuffer" handleFileChange={updateSong} />
          </Grid>
          <Grid item xs={6}>
            <PanControl
              name="audioPan"
              pan={audioPan}
              handleChange={updateSong}
            />
          </Grid>
          <Grid item xs={6}>
            <SoundControl
              name="soundStatus"
              soundStatus={soundStatus}
              handleChange={updateSong}
            />
          </Grid>
          <Grid item xs={6}>
            <VolumeControl
              name="audioVolume"
              label="Audio"
              volume={audioVolume}
              handleChange={updateSong}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={() => {
                setExpanded(!expanded);
                updateSongs();
              }}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={() => {
                setExpanded(!expanded);
                deleteSong();
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SongItem;
