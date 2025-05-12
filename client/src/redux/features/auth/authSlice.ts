import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  addresses: any;
  password: string;
  phoneNumber: string | number;
  role: "";
  isVerified: boolean;
  courses: { _id: string }[];
};

type AuthState = {
  token: string;
  user: User | null;
  shop: any;
};

const initialState: AuthState = {
  token: "",
  user: null,
  shop: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.token = "";
      state.user = null;
    },

    vendorLogin: (
      state,
      action: PayloadAction<{ accessToken: string; shop: any }>
    ) => {
      state.token = action.payload.accessToken;
      state.shop = action.payload.shop;
    },

    vendorLogout: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const {
  userRegistration,
  userLogin,
  userLogout,
  vendorLogin,
  vendorLogout,
} = authSlice.actions;

export default authSlice.reducer;
