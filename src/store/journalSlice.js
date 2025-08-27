import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    journal: [],
    loading: false,
    error: null
}

const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        setJournal: (state, action) => {
            state.journal = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        // removeUser: (state) => {
        //     state.user = null;
        // },
    },
});

export const { setJournal, setLoading, setError } = journalSlice.actions;

export default journalSlice.reducer;
