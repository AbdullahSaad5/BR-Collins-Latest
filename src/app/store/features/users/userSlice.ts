import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import { IUser } from "@/app/types/user.contract";

// Define a type for the slice state
interface UserState {
  user: IUser | {};
  accessToken: string | null;
  refreshToken: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {},
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, setAccessToken, setRefreshToken, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const isUserLoggedIn = (state: RootState) => state.user.accessToken !== null;

export const getAccessToken = (state: RootState) => state.user.accessToken;

export const getRefreshToken = (state: RootState) => state.user.refreshToken;

export default userSlice.reducer;
