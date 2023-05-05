import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";

import { PlaybackControls } from "../PlaybackControls";
import useMetronome from "../../hooks/useMetronome";
import styles from "./metronome.module.css";
import { CreateSong } from "../CreateSong";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Metronome = () => {
  const { isPlaying, handleClick } = useMetronome();
  const [drawer, setDrawer] = useState(false);

  return (
    <Box className={styles.screen}>
      <Box className={styles.container}>
        <PlaybackControls isPlaying={isPlaying} handleClick={handleClick} />
      </Box>
      <StyledFab
        size="small"
        color="secondary"
        aria-label="add"
        onClick={() => setDrawer(true)}
      >
        <AddIcon />
      </StyledFab>
      <Drawer anchor={"bottom"} open={drawer} onClose={() => setDrawer(false)}>
        <CreateSong></CreateSong>
      </Drawer>
    </Box>
  );
};

export default Metronome;
