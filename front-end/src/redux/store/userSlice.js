import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userIndex: '',
  nickname: '',
  email: '',
  gender: '',
  birth: '',
  userId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIndex(state, action) {
      state.userIndex = action.payload
    },
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
    setUserId(state, action) {
      state.userId = action.payload;
    }
  },
});

export const { setNickname, setEmail, setGender, setBrith, setUserId, setUserIndex } = userSlice.actions;

export default userSlice;
