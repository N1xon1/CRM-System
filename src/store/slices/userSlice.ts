import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  userName: null,
  password: null,
  email: null,
  phoneNumber: null,
};

const userSliсe = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },

    removeUser(state) {
      state.login = null;
      state.userName = null;
      state.password = null;
      state.email = null;
      state.phoneNumber = null;
    },
  },
});

export const { setUser, removeUser } = userSliсe.actions;
export default userSliсe.reducer;
