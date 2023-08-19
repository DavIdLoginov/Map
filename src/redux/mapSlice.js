import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const counterSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    // Reducer function to handle fetching and storing route data
    watchFetchRouteNice: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
  },
});

export const GET_POSTS = "map/watchFetch";
export const watchFetch = createAction(GET_POSTS);

export const { watchFetchRouteNice } = counterSlice.actions;
export default counterSlice.reducer;
