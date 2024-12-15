import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocket as updateStoreSocket } from '../slices/storeSlice';
import { updateSocket as updateCaptainSocket } from '../slices/captainSlice';

export const SocketContext = createContext();

const socket = io('http://localhost:4000'); // Replace with your server URL

const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.store.store);
    const captain = useSelector((state) => state.captain.captain);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            if (store) {
                dispatch(updateStoreSocket(socket.id));
            } else if (captain) {
                dispatch(updateCaptainSocket(socket.id));
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, [dispatch, store, captain]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;