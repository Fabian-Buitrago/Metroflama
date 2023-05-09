import { useContext } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SvgIcon from "@mui/material/SvgIcon";

import useMetronome from "../../hooks/useMetronome";
import { AudioContext } from "../../context/AudioContext";
import styles from "./playbackControls.module.css";

const PlayAnimation = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        viewBox="0 0 120 120"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle id="ci1" cx="46.58" cy="66.56" r="1" />
        <circle id="ci2" cx="46.58" cy="66.56" r="1" />
        <circle id="ci3" cx="46.58" cy="66.56" r="1" />
        <circle id="ci4" cx="46.58" cy="66.56" r="1" />
      </svg>
    </SvgIcon>
  );
};

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
        <CardContent sx={{ paddingBottom: 0, textTransform: "capitalize" }}>
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
            sx={{ width: "5rem" }}
          >
            {tempo} BPM
          </Typography>
          <IconButton
            aria-label="play/pause"
            onClick={handleClick}
            sx={{ margin: "0 50px", color: "#ff7b40" }}
          >
            {isPlaying ? (
              <div className={styles.playContainer}>
                <StopIcon
                  className={styles.pauseIcon}
                  sx={{ height: 60, width: 60 }}
                />
                <PlayAnimation className={styles.svgImage} />
              </div>
            ) : (
              <PlayArrowIcon
                className={styles.playIcon}
                sx={{ height: 60, width: 60 }}
              />
            )}
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ width: "5rem" }}
          >
            {timeSignature}
          </Typography>
        </Box>
      </Card>
    )
  );
}
