import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

// Khởi tạo slice của Redux Toolkit
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    removeUser(state) {
      return {
        ...state,
        user: null,
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
