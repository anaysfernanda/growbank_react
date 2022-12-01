import { combineReducers } from "@reduxjs/toolkit";

import carteira from "./CarteiraSlice";
import login from "./LoginSlice";
import carteira2 from "./CarteiraSlice";

export default combineReducers({
  login,
  carteira,
  carteira2,
});
