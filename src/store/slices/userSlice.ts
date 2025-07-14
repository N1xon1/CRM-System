import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  id: null as string | null,
  userName: null as string | null,
  date: null as string | null,
  email: null as string | null,
  phoneNumber: null as string | null,
  refreshToken: null as string | null,
  accessToken: null as string | null,
  isAuth: false,
  isBlocked: null as boolean | null,
};

const userSliсe = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        userName: string;
        email: string;
        date: string;
        isBlocked: boolean;
        phoneNumber: string;
      }>
    ) {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.date = action.payload.date;
      state.email = action.payload.email;
      state.isBlocked = action.payload.isBlocked;
      state.phoneNumber = action.payload.phoneNumber;
      // state.isAuth = true;
    },

    // removeUser(state) {
    //   state.login = null;
    //   state.userName = null;
    //   state.password = null;
    //   state.email = null;
    //   state.phoneNumber = null;
    //   state.refreshToken = null;
    //   state.accessToken = null;
    // },

    getTokensUser(
      state,
      action: PayloadAction<{ refreshToken: string; accessToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    isAuthUser(state, action:PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, getTokensUser, isAuthUser } = userSliсe.actions;
export default userSliсe.reducer;
