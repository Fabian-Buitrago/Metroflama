import { createContext, useReducer } from "react";
import { Snackbar } from "@mui/material";

// initial state
const initialState = {
  open: false,
  message: "",
};

// Reducer
const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return { ...state, open: true, message: action.payload };
    case "HIDE_SNACKBAR":
      return { ...state, open: false };
    default:
      return state;
  }
};

// Create Context
export const SnackbarContext = createContext();

// Context Provider
export const SnackbarProvider = ({ children }) => {
  const [snackbarState, dispatch] = useReducer(snackbarReducer, initialState);

  const showSnackbar = (message) => {
    dispatch({ type: "SHOW_SNACKBAR", payload: message });
  };

  const hideSnackbar = () => {
    dispatch({ type: "HIDE_SNACKBAR" });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        message={snackbarState.message}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
