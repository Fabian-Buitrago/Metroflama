import { createContext, useReducer } from "react";
import { Backdrop } from "@mui/material";

import styles from "./loading.module.css";

export const LoadingContext = createContext();

const initialState = { isLoading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return { isLoading: !state.isLoading };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleLoading = () => {
    dispatch({ type: "TOGGLE_LOADING" });
  };

  return (
    <LoadingContext.Provider value={{ toggleLoading }}>
      {state.isLoading && (
        <Backdrop open style={{ zIndex: 1500 }}>
          <span className={styles.flame}>🔥</span>
        </Backdrop>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
