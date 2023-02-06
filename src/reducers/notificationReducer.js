import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const confirmationGreen = {
  fontSize: "1.5rem",
  color: "#9765E0",
  textAlign: "center",
  background: "white",
  borderRadius: 5,
  border: "2px solid",
  flexShrink: "0",
  width: window.innerWidth < 400 ? "200px" : "500px",
  marginTop: "1em",
};

const errorRed = {
  fontSize: "1.5rem",
  color: "#9765E0",
  textAlign: "center",
  background: "white",
  border: "2px solid",
  padding: ".5em",
  fontWeight: 700,
  borderRadius: 15,
  marginBottom: "2.5em",
  width: window.innerWidth < 400 ? "200px" : "500px",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage(state, action) {
      return null;
    },
  },
});
export const { setMessage, clearMessage } = notificationSlice.actions;
export const displayMessage = (style, message) => {
  return async (dispatch) => {
    const displayStyle = style === "error" ? errorRed : confirmationGreen;
    dispatch(setMessage({ message, displayStyle }));
  };
};

export const removeMessage = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };
};
export default notificationSlice.reducer;
