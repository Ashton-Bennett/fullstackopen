import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayString(state, action) {
      return action.payload;
    },
    setDisplayToNone() {
      return "";
    },
  },
});

let timeoutId;
export const setNotification = (stringToDisplay, secondsToDisplayFor) => {
  return async (dispatch) => {
    const millisecondsToWait = (secondsToDisplayFor * 1000).toString();
    await dispatch(displayString(stringToDisplay));

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch(setDisplayToNone());
    }, millisecondsToWait);
  };
};

export default notificationSlice.reducer;
export const { setDisplayToNone, displayString } = notificationSlice.actions;
