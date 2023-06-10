import { useContext } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SvgIcon from "@mui/material/SvgIcon";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";

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
  const { handleControl, isPlaying, handleSeek } = useMetronome();
  const { currentAudio, duration, position } = useContext(AudioContext);
  const { title, tempo, timeSignature, soundStatus } = currentAudio || {};

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const marks = [
    {
      value: 0,
    },
    {
      value: 20,
    },
    {
      value: 37,
    },
    {
      value: 100,
    },
  ];

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

        {soundStatus === "on" && (
          <Box sx={{ width: "70%" }}>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={duration}
              marks={marks}
              onChange={handleSeek}
              sx={{
                height: 4,
                padding: 0,
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0px 0px 0px 8px rgb(0 0 0 / 16%)",
                  },
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
              }}
            />
            <div>{`${formatTime(position)} / ${formatTime(duration)}`}</div>
          </Box>
        )}
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
            onClick={handleControl}
            sx={{ margin: "0 50px", color: "#ff7b40" }}
          >
            {isPlaying ? (
              <div className={styles.playContainer}>
                <PauseIcon
                  className={styles.pauseIcon}
                  sx={{ height: 54, width: 54 }}
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
