import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";
import PixType from "../../types/PixType";

const initialState: UserType = {
  saldo: 500,
  saque: [],
  deposito: [],
  pix: [],
};

const CarteiraSlice2 = createSlice({
  name: "carteira2",
  initialState,
  reducers: {
    deposito2(state, action: PayloadAction<number>) {
      const data = Date.now();
      state.saldo += action.payload;
      state.deposito.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload,
      });
    },
    saque2(state, action: PayloadAction<number>) {
      const data = Date.now();
      state.saldo -= action.payload;
      state.saque.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload,
      });
    },
    pix2(state, action: PayloadAction<PixType>) {
      const data = Date.now();
      state.saldo -= action.payload.valor;
      state.pix.push({
        id: Math.floor(data / 1000),
        data: new Date(data).toDateString(),
        valor: action.payload.valor,
        destinatario: action.payload.destinatario,
      });
    },
  },
});

export const { deposito2, saque2, pix2 } = CarteiraSlice2.actions;

export default CarteiraSlice2.reducer;
