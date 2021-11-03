import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], artistLink: "", artistName: "" };

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    addAlbums(state, action) {
      state.items = action.payload;
      state.artistLink = action.payload[0].artistLink;
      state.artistName = action.payload[0].artistName;
    },
  },
});

export const albumsActions = albumsSlice.actions;
export default albumsSlice.reducer;
