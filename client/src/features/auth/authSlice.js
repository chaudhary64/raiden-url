import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },

    removeToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
