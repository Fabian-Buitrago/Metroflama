import { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";

import { PlaybackControls } from "../PlaybackControls";
import styles from "./metronome.module.css";
import { CreateSong } from "../CreateSong";
import SongItem from "../SongItem/SongItem";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { AudioContext } from "../../context/AudioContext";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

const StyledFab = styled(Fab)({
  margin: "2rem auto",
  backgroundColor: "#ff7b40",
});

const Nav = styled(Card)({
  fontSize: 20,
  fontWeight: "medium",
  letterSpacing: 0,
  borderRadius: 0,
});

const Metronome = () => {
  const { audioData } = useContext(AudioContext);
  const [drawer, setDrawer] = useState(false);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <Nav>
          <span className={styles.flame}>🔥</span> Metroflama
        </Nav>
        <Divider />
        <PlaybackControls />
        {!drawer && (
          <StyledFab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => setDrawer(true)}
          >
            <AddIcon />
          </StyledFab>
        )}
        <div className={styles.songContainer}>
          {audioData.map((song, index) => (
            <SongItem key={song.id} song={song} index={index} />
          ))}
        </div>
      </div>
      <Drawer anchor={"bottom"} open={drawer} onClose={() => setDrawer(false)}>
        <CreateSong onClose={() => setDrawer(false)}></CreateSong>
      </Drawer>
      <DeleteConfirmDialog />
    </div>
  );
};

export default Metronome;
