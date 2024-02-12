import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  email: '',
  gender: '',
  birth: '',
  userId : '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setBrith(state, action) {
      state.birth = action.payload;
    },
    setUserId(state, action){
      state.userId = action.payload;
    }
  },
});

export const { setNickname, setEmail, setGender, setBrith, setUserId } = userSlice.actions;

export default userSlice;
