import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  artistLink: "",
  artistName: "",
  apiCallHasError: false,
  isSearching: false,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    addAlbums(state, action) {
      if (action.payload.length > 0) {
        state.items = action.payload;
        state.artistLink = action.payload[0].artistLink;
        state.artistName = action.payload[0].artistName;
      }
    },
    apiCallHasError(state, action) {
      state.apiCallHasError = true;
    },
    apiCallHasNoError(state, action) {
      state.apiCallHasError = false;
    },
    startedSearching(state, action) {
      state.isSearching = true;
    },
    finishedSearching(state, action) {
      state.isSearching = false;
    },
  },
});

export const albumsActions = albumsSlice.actions;
export default albumsSlice.reducer;
