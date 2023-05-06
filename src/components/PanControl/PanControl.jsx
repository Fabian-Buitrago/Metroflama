export const PanControl = ({ name, label, pan, handleChange }) => (
  <select name={name} defaultValue={pan} onChange={handleChange}>
    <option value="-1">{`Izquierda - ${label}`}</option>
    <option value="0">{`Centro - ${label}`}</option>
    <option value="1">{`Derecha - ${label}`}</option>
  </select>
);
