import { useState, useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { debounce } from "lodash";

import { TempoControl } from "../TempoControl";
import { TimeSignatureControl } from "../TimeSignatureControl";
import { PanControl } from "../PanControl";
import { VolumeControl } from "../VolumeControl";
import { FileInput } from "../FileInput";
import { AudioContext } from "../../context/AudioContext";
import { SoundControl } from "../SoundControl";
import { useDialog } from "../../context/DialogContext";
import { BUFFER_MESSAGE_ERROR } from "../../constants";
import { SnackbarContext } from "../../context/SnackbarContext";
import styles from "./songItem.module.css";

const SongItem = ({ song, index, handleFocus }) => {
  const { audioData, setAudioData, currentAudio, setCurrentAudio, isPlaying } =
    useContext(AudioContext);
  const [songInfo, setSongInfo] = useState(song);
  const [expanded, setExpanded] = useState(false);
  const { openDialog } = useDialog();
  const { showSnackbar } = useContext(SnackbarContext);

  const {
    id,
    title,
    tempo,
    beatVolume,
    beatPan,
    timeSignature,
    audioVolume,
    audioPan,
    soundStatus,
    audioBuffer,
  } = songInfo;

  const isValidToPlay = () => {
    return audioBuffer || soundStatus === "off";
  };

  const debouncedOnClick = debounce(() => {
    if (isValidToPlay()) {
      setCurrentAudio({ ...songInfo });
    } else {
      showSnackbar(BUFFER_MESSAGE_ERROR);
    }
  }, 300);

  useEffect(() => {
    return () => {
      debouncedOnClick.cancel();
    };
  }, [debouncedOnClick]);

  const updateSong = (e) => {
    const { name, value } = e.target;
    setSongInfo({ ...songInfo, [name]: value });
  };

  const deleteSong = () => {
    const newAudioData = [...audioData];
    newAudioData.splice(index, 1);
    setAudioData(newAudioData);
  };

  const handleDelete = () => {
    const dispatchAction = () => {
      deleteSong();
    };

    openDialog({
      title: `¿Estás seguro de que deseas eliminar "${title}"?`,
      dispatchAction,
    });
  };

  const isActive = () => {
    return id === currentAudio?.id && isPlaying;
  };

  const updateSongs = () => {
    isPlaying && setCurrentAudio(null);
    handleFocus();
    const updatedObj = { ...audioData[index], songInfo };
    const updatedData = [...audioData];
    updatedData[index] = updatedObj;
    setAudioData(updatedData);
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          />
        }
      >
        <AudiotrackIcon
          onClick={debouncedOnClick}
          className={`${styles.audiotrack} ${isActive() ? styles.active : ""}`}
        />
        <Typography sx={{ marginRight: 2, textTransform: "capitalize" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} sx={{ padding: 5 }}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ fontWeight: 500 }}
            >
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
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ fontWeight: 500 }}
            >
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

          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setExpanded(!expanded);
                updateSongs();
              }}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SongItem;
