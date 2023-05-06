import { useContext } from "react";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import useMetronome from "../../hooks/useMetronome";
import { AudioContext } from "../../context/AudioContext";

export function PlaybackControls() {
  const { handleClick, isPlaying } = useMetronome();
  const { currentAudio } = useContext(AudioContext);
  const { title, tempo, timeSignature } = currentAudio || {};

  return (
    currentAudio && (
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          borderRadius: "0 0 30% 30%",
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {tempo} BPM
          </Typography>
          <IconButton
            aria-label="play/pause"
            onClick={handleClick}
            sx={{ margin: "0 50px", color: "#ff7b40" }}
          >
            {isPlaying ? (
              <StopIcon sx={{ height: 60, width: 60 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 60, width: 60 }} />
            )}
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {timeSignature}
          </Typography>
        </Box>
      </Card>
    )
  );
}
