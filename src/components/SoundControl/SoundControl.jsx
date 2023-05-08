import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export const SoundControl = ({ name, soundStatus, handleChange }) => (
  <FormControlLabel
    control={
      <Switch
        size="small"
        name={name}
        checked={soundStatus === "on"}
        onChange={(e, checked) => {
          e.target.value = checked ? "on" : "off";
          handleChange(e);
        }}
      />
    }
    label="Sound"
    labelPlacement="start"
  />
);
