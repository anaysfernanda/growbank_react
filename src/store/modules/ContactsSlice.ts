import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ContactType } from "../../types";

const adapter = createEntityAdapter<ContactType>({
  selectId: (item) => item.phone,
});

// export const { selectAll: selectContacts, selectById: selectContactById } =
//   adapter.getSelectors((state: RootState) => state.contacts);

const sliceContacts = createSlice({
  name: "contacts",
  initialState: adapter.getInitialState({ status: "" }),
  reducers: {
    addContact: adapter.addOne,
    addMany: adapter.addMany,
    updateContact: adapter.updateOne,
    deleteContact: adapter.removeOne,
    deleteContacts: adapter.removeAll,
  },
});

export const { addContact, addMany, deleteContact, updateContact } =
  sliceContacts.actions;
export default sliceContacts.reducer;
