import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store:null
};

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        storelogin: (state, action) => {
            state.store = action.payload;
        },
        storelogout: (state) => {
            state.store = null
        },
        updateSocket:(state,action)=>{
            state.store.socketId=action.payload;
        }
    },
});

export const { storelogin, storelogout, updateSocket } = storeSlice.actions;

export default storeSlice.reducer;