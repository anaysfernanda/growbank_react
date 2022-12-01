import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";
import PixType from "../../types/PixType";
import { TransactionType } from "../../types/TransactionType";

const initialState: UserType = {
  saldo: 500,
  transactions: [],
};

const CarteiraSlice2 = createSlice({
  name: "carteira2",
  initialState,
  reducers: {
    deposito2(state, action: PayloadAction<number>) {
      const data = Date.now();
      state.saldo += action.payload;
      state.transactions.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload,
        type: "Depósito",
      });
    },
    saque2(state, action: PayloadAction<number>) {
      const data = Date.now();
      state.saldo -= action.payload;
      state.transactions.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload,
        type: "Saque",
      });
    },
    pix2(state, action: PayloadAction<TransactionType>) {
      const data = Date.now();
      state.saldo -= action.payload.valor;
      state.transactions.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload.valor,
        destinatario: action.payload.destinatario,
        type: "Pix",
      });
    },
    deleteT(state, action: PayloadAction<TransactionType>) {
      const index = state.transactions.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.transactions.splice(index, 1);
      }
      return state;
    },
  },
});

export const { deposito2, saque2, pix2, deleteT } = CarteiraSlice2.actions;

export default CarteiraSlice2.reducer;
