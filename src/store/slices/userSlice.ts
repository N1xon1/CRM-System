import { Roles, User } from "@/models/admin";
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
  roles: Roles[] | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  date: null,
  email: null,
  phonenumber: null,
  refreshToken: null,
  accessToken: null,
  isAuth: false,
  roles: null,
  isBlocked: null,
};

const userSliсe = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.date = action.payload.date;
      state.email = action.payload.email;
      state.isBlocked = action.payload.isBlocked;
      state.roles = action.payload.roles;
      state.phonenumber = action.payload.phoneNumber;
    },

    isAuthUser(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, isAuthUser } = userSliсe.actions;
export default userSliсe.reducer;
