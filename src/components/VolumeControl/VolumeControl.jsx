export const VolumeControl = ({ label, volume, handleChange }) => (
  <label>
    {label}
    <input
      type="range"
      min="-60"
      max="0"
      step="0.01"
      value={volume}
      onChange={(e) => handleChange(e.target.value)}
    />
  </label>
);
