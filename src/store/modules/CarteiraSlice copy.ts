import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTemplateExpression } from "typescript";
import { UserType } from "../../types";

const initialState: UserType = {
  saldo: 500,
  saque: [],
  deposito: [],
  pix: [],
};

const CarteiraSlice = createSlice({
  name: "carteira2",
  initialState,
  reducers: {
    deposito(state, action: PayloadAction<UserType>) {
      state.saldo += action.payload.saldo;
      state.deposito.map((item) => (item.id = Math.floor(Date.now() / 1000)));
    },
    saque(state, action: PayloadAction<UserType>) {
      state.saldo -= action.payload.saldo;
    },
  },
});

export const { deposito, saque } = CarteiraSlice.actions;

export default CarteiraSlice.reducer;
