import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repo: [],       // ✅ will always be an array
  loading: false,
  error: null,
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepo: (state, action) => {
      state.repo = action.payload; // ✅ payload is already array
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRepo, setLoading, setError } = repoSlice.actions;
export default repoSlice.reducer;
