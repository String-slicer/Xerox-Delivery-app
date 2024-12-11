import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store: {
        name: '',
        address: '',
        email: ''
    },
};

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        storelogin: (state, action) => {
            state.store = action.payload;
        },
        storelogout: (state) => {
            state.store = {
                name: '',
                address: '',
                email: ''
            };
        },
    },
});

export const { storelogin, storelogout } = storeSlice.actions;

export default storeSlice.reducer;