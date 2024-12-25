import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store: null,
    newOrders: [],
    acceptedOrders: []
};

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        storelogin: (state, action) => {
            state.store = action.payload;
            state.newOrders = [];
            state.acceptedOrders = [];
        },
        storelogout: (state) => {
            state.store = null;
            state.newOrders = [];
            state.acceptedOrders = [];
        },
        updateSocket: (state, action) => {
            state.store.socketId = action.payload;
        },
        addNewOrder: (state, action) => {
            if (!state.newOrders) {
                state.newOrders = [];
            }
            const orderExists = state.newOrders.some(order => order._id === action.payload._id);
            if (!orderExists) {
                state.newOrders.push(action.payload);
            }
        },
        acceptOrder: (state, action) => {
            const orderId = action.payload;
            const orderIndex = state.newOrders.findIndex(order => order._id === orderId);
            if (orderIndex !== -1) {
                const [acceptedOrder] = state.newOrders.splice(orderIndex, 1);
                state.acceptedOrders.push({ ...acceptedOrder, status: "Accepted" });
            }
        },
        cancelOrder: (state, action) => {
            const orderId = action.payload;
            state.newOrders = state.newOrders.filter(order => order._id !== orderId);
            state.acceptedOrders = state.acceptedOrders.filter(order => order._id !== orderId);
        },
        updateOrderStatus: (state, action) => {
            const orderIndex = state.acceptedOrders.findIndex(order => order._id === action.payload.orderId);
            if (orderIndex !== -1) {
                state.acceptedOrders[orderIndex].status = action.payload.status;
            }
        }
    },
});

export const { storelogin, storelogout, updateSocket, addNewOrder, acceptOrder, cancelOrder, updateOrderStatus } = storeSlice.actions;

export default storeSlice.reducer;