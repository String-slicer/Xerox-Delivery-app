import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocket as updateStoreSocket, addNewOrder } from '../slices/storeSlice';
import { updateSocket as updateCaptainSocket } from '../slices/captainSlice';
import { updateSocket as updateUserSocket, setAcceptedOrderData, updateCaptainLocation } from '../slices/userSlice';
export const SocketContext = createContext();

const socket = io('http://localhost:4000'); // Replace with your server URL
// const socket = io('https://ns2v1r0n-4000.inc1.devtunnels.ms/'); // Replace with your server URL

const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.store.store);
    const captain = useSelector((state) => state.captain.captain);
    const user=useSelector((state)=>state.user.user);
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            if (store) {
                dispatch(updateStoreSocket(socket.id));
            } else if (captain) {
                dispatch(updateCaptainSocket(socket.id));
            }
            else{
                dispatch(updateUserSocket(socket.id));
            }
        });

        socket.on('newOrder', (newOrder) => {
            if (store) {
                dispatch(addNewOrder(newOrder));
            }
        });

        socket.on('storeAcceptedOrder', (data) => {
            if (user) {
                dispatch(setAcceptedOrderData(data.order));
            }
        });

        socket.on('captainLocationUpdate', (location) => {
            console.log('Captain location updated');
            dispatch(updateCaptainLocation(location));
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, [dispatch, store, captain,user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;