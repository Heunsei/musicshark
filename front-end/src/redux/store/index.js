import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import loginSlice from './loginSlice'

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    login: loginSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'login',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});


export default store;