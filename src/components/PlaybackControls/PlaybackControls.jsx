import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export function PlaybackControls({ isPlaying, handleClick }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="div" variant="h5">
          Fuego En La Habitacion
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary" component="div">
          120 BPM
        </Typography>
        <IconButton
          aria-label="play/pause"
          onClick={handleClick}
          sx={{ margin: "0 50px" }}
        >
          {isPlaying ? (
            <StopIcon />
          ) : (
            <PlayArrowIcon sx={{ height: 60, width: 60 }} />
          )}
        </IconButton>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          4/4
        </Typography>
      </Box>
    </Card>
  );
}
