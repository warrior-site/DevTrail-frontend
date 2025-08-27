import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    project: [],
    loading: false,
    error: null
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.project = action.payload.projects || [];
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

export const { setProject, setLoading, setError } = projectSlice.actions;

export default projectSlice.reducer;
