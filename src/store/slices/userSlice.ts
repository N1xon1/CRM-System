import { Roles, User } from "@/models/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setUser(
      state,
      action: PayloadAction<
        Partial<{
          id: number;
          username: string;
          email: string;
          date: string;
          isBlocked: boolean;
          phonenumber: string;
        }>
      >
    ) {
      if (action.payload.id !== undefined) state.id = action.payload.id;
      if (action.payload.username !== undefined)
        state.username = action.payload.username;
      if (action.payload.email !== undefined)
        state.email = action.payload.email;
      if (action.payload.date !== undefined) state.date = action.payload.date;
      if (action.payload.isBlocked !== undefined)
        state.isBlocked = action.payload.isBlocked;
      if (action.payload.phonenumber !== undefined)
        state.phonenumber = action.payload.phonenumber;
    },

    isAuthUser(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, isAuthUser } = userSliсe.actions;
export default userSliсe.reducer;
