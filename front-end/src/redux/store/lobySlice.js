import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoby: true,
};

const lobySlice = createSlice({
    name: 'isLoby',
    initialState,
    reducers: {
        setLoby(state, action) {
            console.log(action.payload)
            state.isLoby = action.payload;
        },
    },
});

export const { setLoby } = lobySlice.actions;

export default lobySlice