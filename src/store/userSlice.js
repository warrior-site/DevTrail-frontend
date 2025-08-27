import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: null,
    loading: false,
    error: null,
    message: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setUser, setLoading, setError, removeUser,setMessage } = userSlice.actions;

export default userSlice.reducer;
