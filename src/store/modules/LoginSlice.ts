import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginType {
  user: string;
  password: string;
  logged: boolean;
}

const initialState: LoginType = {
  user: "",
  password: "",
  logged: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginType>) {
      return action.payload;
    },
    logoff() {
      return initialState;
    },
  },
});

export const { login, logoff } = loginSlice.actions;
export default loginSlice.reducer;
