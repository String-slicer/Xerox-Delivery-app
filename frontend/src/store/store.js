import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import captainReducer from "../slices/captainSlice";
import storeReducer from "../slices/storeSlice";
export const store =configureStore({
    reducer:{
        user:userReducer,
        captain:captainReducer,
        store:storeReducer,
    },
})