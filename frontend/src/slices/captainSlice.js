import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    captain: null,
    currentOrder: null,
};

export const captainSlice = createSlice({
    name: "captain",
    initialState,
    reducers: {
        captainlogin: (state, action) => {
            state.captain = action.payload;
        },
        captainlogout: (state) => {
            state.captain = null;
            state.currentOrder = null;
            // Add any other states that need to be cleared
        },
        updateSocket: (state, action) => {
            state.captain.socketId = action.payload;
        },
        updateCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        }
    },
});

export const { captainlogin, captainlogout, updateSocket, updateCurrentOrder } = captainSlice.actions;

export default captainSlice.reducer;