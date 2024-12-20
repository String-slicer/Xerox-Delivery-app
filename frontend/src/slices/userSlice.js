import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    acceptedOrderData: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.acceptedOrderData = null;
        },
        updateSocket: (state, action) => {
            state.user.socketId = action.payload;
        },
        setAcceptedOrderData: (state, action) => {
            state.acceptedOrderData = action.payload;
        }
    },
});

export const { login, logout, updateSocket, setAcceptedOrderData } = userSlice.actions;

export default userSlice.reducer;