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

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  bottom: 30,
  left: 0,
  right: 0,
  margin: "0 auto",
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
        <div className={styles.songContainer}>
          {audioData.map((song, index) => (
            <SongItem key={song.id} song={song} index={index} />
          ))}
        </div>
      </div>
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
      <Drawer anchor={"bottom"} open={drawer} onClose={() => setDrawer(false)}>
        <CreateSong onClose={() => setDrawer(false)}></CreateSong>
      </Drawer>
    </div>
  );
};

export default Metronome;
