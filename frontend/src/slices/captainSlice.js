import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const captainSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = captainSlice.actions;

export default captainSlice.reducer;