import TextField from "@mui/material/TextField";
export const TempoControl = ({ name, tempo, setTempo }) => (
  <TextField
    name={name}
    type="number"
    InputProps={{
      inputProps: {
        max: 100,
        min: 10,
      },
    }}
    label="Tempo"
    size="small"
    defaultValue={tempo}
    onChange={setTempo}
  />
);
