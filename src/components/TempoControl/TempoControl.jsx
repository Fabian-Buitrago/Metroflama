export const TempoControl = ({ name, tempo, setTempo }) => (
  <>
    <label htmlFor="tempo">Tempo:</label>
    <input
      name={name}
      type="number"
      min="1"
      max="300"
      defaultValue={tempo}
      onChange={setTempo}
    />
  </>
);
