import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface UserState {
  id: number | null;
  username: string | null;
  date: string | null;
  email: string | null;
  phonenumber: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  isAuth: boolean;
  isBlocked: boolean | null;
}

const initialState:UserState = {
  id: null as number | null,
  username: null as string | null,
  date: null as string | null,
  email: null as string | null,
  phonenumber: null as string | null,
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
        id: number;
        username: string;
        email: string;
        date: string;
        isBlocked: boolean;
        phonenumber: string;
      }>
    ) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.date = action.payload.date;
      state.email = action.payload.email;
      state.isBlocked = action.payload.isBlocked;
      state.phonenumber = action.payload.phonenumber;
    },

    isAuthUser(state, action:PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, isAuthUser } = userSliсe.actions;
export default userSliсe.reducer;
