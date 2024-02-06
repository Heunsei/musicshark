import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import loginSlice from './loginSlice'
import userSlice from './userSlice';
import lobySlice from './lobySlice';

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    login: loginSlice.reducer,
    user: userSlice.reducer,
    isLoby : lobySlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'login',
        'user',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});


export default store;