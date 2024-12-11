import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    captain: null,
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
        },
    },
});

export const { captainlogin, captainlogout } = captainSlice.actions;

export default captainSlice.reducer;