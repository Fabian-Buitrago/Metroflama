import { useState, useContext, createRef } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";
import { DragDropContext } from "react-beautiful-dnd";

import { PlaybackControls } from "../PlaybackControls";
import styles from "./metronome.module.css";
import { CreateSong } from "../CreateSong";
import SongItem from "../SongItem/SongItem";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { AudioContext } from "../../context/AudioContext";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { reorder } from "../../utils/reorder";
import { StrictModeDroppable } from "../StrictModeDroppable";

const StyledFab = styled(Fab)({
  margin: "2rem auto",
});

const Nav = styled(Card)({
  fontSize: 20,
  fontWeight: "medium",
  letterSpacing: 0,
  borderRadius: 0,
});

const Metronome = () => {
  const { audioData, isPlaying, setCurrentAudio, setAudioData } =
    useContext(AudioContext);
  const [drawer, setDrawer] = useState(false);
  const mainContainerRef = createRef();

  const spaceBarEvent = (event) => {
    if (event.key === " ") {
      isPlaying && setCurrentAudio(null);
    }
  };

  const handleFocus = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.focus();
    }
  };

  const handleClose = () => {
    setDrawer(false);
    handleFocus();
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const newItems = reorder(audioData, source.index, destination.index);
    setAudioData(newItems);
  };

  return (
    <div
      className={styles.screen}
      onKeyDown={spaceBarEvent}
      tabIndex="0"
      ref={mainContainerRef}
    >
      <div className={styles.container}>
        <Nav>🔥 Metroflama</Nav>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="droppableSongs">
            {(provided) => (
              <div
                className={styles.songContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {audioData.map((song, index) => (
                  <SongItem
                    key={song.id}
                    song={song}
                    index={index}
                    handleFocus={handleFocus}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
      <Drawer anchor={"bottom"} open={drawer} onClose={handleClose}>
        <CreateSong onClose={handleClose}></CreateSong>
      </Drawer>
      <DeleteConfirmDialog />
    </div>
  );
};

export default Metronome;
