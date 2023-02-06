import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return initialState;
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;

export const loggedInUser = (user) => {
  return async (dispatch) => {
    const usersInDb = (await axios.get("/api/users")).data;
    const fullUserData = usersInDb.filter(
      (dataBase) => dataBase.username === user.username
    );
    dispatch(setUser(fullUserData[0]));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
