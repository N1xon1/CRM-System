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
}

const initialState: UserState = {
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
