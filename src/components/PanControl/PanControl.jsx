export const PanControl = ({ label, pan, handleChange }) => (
  <select defaultValue={pan} onChange={(e) => handleChange(e.target.value)}>
    <option value="-1">{`Izquierda - ${label}`}</option>
    <option value="0">{`Centro - ${label}`}</option>
    <option value="1">{`Derecha - ${label}`}</option>
  </select>
);
