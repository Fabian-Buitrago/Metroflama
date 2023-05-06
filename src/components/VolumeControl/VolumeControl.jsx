export const VolumeControl = ({ name, label, volume, handleChange }) => (
  <label>
    {label}
    <input
      name={name}
      type="range"
      min="-60"
      max="0"
      step="0.01"
      defaultValue={volume}
      onChange={handleChange}
    />
  </label>
);
