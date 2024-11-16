// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slices/apiSlices"; // Import the API slice

export const store = configureStore({
  reducer: {
    api: apiSlice,
  },
});

export default store;
