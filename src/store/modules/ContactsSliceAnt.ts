import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContactsType, ContactType } from "../../types";

const initialState: ContactsType = {
  items: [],
  status: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<ContactType>) {
      const index = state.items.findIndex(
        (item) => item.phone === action.payload.phone
      );

      if (index === -1) {
        state.items.push(action.payload);
        state.status = "success";
        return state;
      }

      state.status = "error";
      return state;
    },
    deleteContact(state, action: PayloadAction<ContactType>) {
      const index = state.items.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.phone === action.payload.phone
      );

      if (index >= 0) {
        state.items.splice(index, 1);
        state.status = "success";
      }

      state.status = "error";
      return state;
    },
    clearStatusContacts(state) {
      state.status = "";
      return state;
    },
    clear() {
      return initialState;
    },
  },
});

export const { addContact, deleteContact, clear, clearStatusContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
