import { combineReducers } from "@reduxjs/toolkit";

import login from "./LoginSlice";
import transactions from "./TransactionsSlice";

export default combineReducers({
  login,
  transactions,
});
