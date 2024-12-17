import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
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
        },
        updateSocket:(state,action)=>{
            state.user.socketId=action.payload;
        }
        
    },
});

export const { login, logout ,updateSocket} = userSlice.actions;

export default userSlice.reducer;