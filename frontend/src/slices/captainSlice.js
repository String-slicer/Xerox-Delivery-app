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
        updateSocket:(state,action)=>{
            state.captain.socketId=action.payload;
        }
    },
});

export const { captainlogin, captainlogout,updateSocket } = captainSlice.actions;

export default captainSlice.reducer;