import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: "",
    kakao: false,
};

const kakaoRegisterSlice = createSlice({
    name: "kakaoReigster",
    initialState,
    reducers: {
        setEmail(state, action){
            state.email = action.payload;
        },
        setKakao(state, action){
            state.kakao = action.payload;
        }
    }
});

export const { setEmail, setKakao } = kakaoRegisterSlice.actions;

export default kakaoRegisterSlice;