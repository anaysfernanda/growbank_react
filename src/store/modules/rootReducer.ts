import { combineReducers } from "@reduxjs/toolkit";

import carteira from "./CarteiraSlice";
import login from "./LoginSlice";

export default combineReducers({
  login,
  carteira,
});
