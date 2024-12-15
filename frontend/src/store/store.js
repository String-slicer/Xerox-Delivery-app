import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage for web
import userReducer from '../slices/userSlice';
import captainReducer from '../slices/captainSlice';
import storeReducer from '../slices/storeSlice';
import { combineReducers } from '@reduxjs/toolkit';
// Configuration for redux-persist
const rootReducer = combineReducers({
    user: userReducer,
    captain: captainReducer,
    store: storeReducer,
  });
  const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
