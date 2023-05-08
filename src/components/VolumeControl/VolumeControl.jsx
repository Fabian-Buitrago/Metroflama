import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

export const VolumeControl = ({ name, label, volume, handleChange }) => (
  // <label>
  //   {label}
  //   <input
  //     name={name}
  //     type="range"
  //     min="-60"
  //     max="0"
  //     step="0.01"
  //     defaultValue={volume}
  //     onChange={handleChange}
  //   />
  // </label>

  <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
    <VolumeDown />
    <Slider
      aria-label="Volume"
      value={volume}
      onChange={handleChange}
      min={-60}
      max={0}
      step={0.01}
      name={name}
    />
    <VolumeUp />
  </Stack>
);
