export const TimeSignatureControl = ({
  name,
  timeSignature,
  setTimeSignature,
}) => (
  <select name={name} defaultValue={timeSignature} onChange={setTimeSignature}>
    <option value="1/4">1/4</option>
    <option value="2/4">2/4</option>
    <option value="3/4">3/4</option>
    <option value="4/4" defaultValue>
      4/4
    </option>
    <option value="5/4">5/4</option>
    <option value="6/8">6/8</option>
    <option value="7/8">7/8</option>
    <option value="8/8">8/8</option>
  </select>
);
