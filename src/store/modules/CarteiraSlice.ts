import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  saldo: number;
}

const initialState = { saldo: 300 } as WalletState;

const CarteiraSlice = createSlice({
  name: "carteira",
  initialState,
  reducers: {
    deposito(state, action: PayloadAction<number>) {
      state.saldo += action.payload;
    },
    saque(state, action: PayloadAction<number>) {
      state.saldo -= action.payload;
    },
  },
});

export const { deposito, saque } = CarteiraSlice.actions;

export default CarteiraSlice.reducer;
