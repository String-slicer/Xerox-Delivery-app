import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    acceptedOrderData: null,
    captainLocation: null,
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
        },
        updateCaptainLocation: (state, action) => {
            if (state.acceptedOrderData && state.acceptedOrderData.deliveryPartnerId) {
                state.acceptedOrderData.deliveryPartnerId.location.ltd = action.payload.location.ltd;
                state.acceptedOrderData.deliveryPartnerId.location.lng = action.payload.location.lng;
                console.log('Captain location updated',action.payload);
                console.log(action.payload.location);
            }
        }
    },
});

export const { login, logout, updateSocket, setAcceptedOrderData, updateCaptainLocation } = userSlice.actions;

export default userSlice.reducer;