import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export const TimeSignatureControl = ({
  name,
  timeSignature,
  setTimeSignature,
}) => (
  <Select
    name={name}
    value={timeSignature}
    onChange={setTimeSignature}
    size="small"
  >
    <MenuItem value="1/4">1/4</MenuItem>
    <MenuItem value="2/4">2/4</MenuItem>
    <MenuItem value="3/4">3/4</MenuItem>
    <MenuItem value="4/4">4/4</MenuItem>
    <MenuItem value="5/4">5/4</MenuItem>
    <MenuItem value="6/8">6/8</MenuItem>
    <MenuItem value="7/8">7/8</MenuItem>
    <MenuItem value="8/8">8/8</MenuItem>
  </Select>
);
