import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import Badge from "@mui/material/Badge";

const Markers = ({ onClick, name, markNumber, remove }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Tooltip
      title={name}
      aria-label={name}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Badge
        badgeContent={
          isFocused && (
            <ClearIcon
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                remove();
              }}
              style={{ cursor: "pointer", fontSize: "1rem" }}
            />
          )
        }
      >
        <Fab style={{ transform: "scale(0.7)" }} size="small" onClick={onClick}>
          {markNumber}
        </Fab>
      </Badge>
    </Tooltip>
  );
};

export default Markers;
