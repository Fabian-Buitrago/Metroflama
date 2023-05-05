export const TempoControl = ({ tempo, setTempo }) => (
  <>
    <label htmlFor="tempo">Tempo:</label>
    <input
      id="tempo"
      type="number"
      min="1"
      max="300"
      value={tempo}
      onChange={(e) => setTempo(e.target.value)}
    />
  </>
);
