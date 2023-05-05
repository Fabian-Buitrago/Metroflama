export const FileInput = ({ handleFileChange }) => (
  <input type="file" accept="audio/*" onChange={handleFileChange} />
);
