import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import captainReducer from "../slices/captainSlice";
export const store =configureStore({
    reducer:{
        user:userReducer,
        captain:captainReducer,
    },
})