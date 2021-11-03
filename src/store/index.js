import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albumsSlice";
const store = configureStore({
  reducer: {
    albumsReducer: albumsReducer,
  },
});

export default store;
