import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {email: null, token: null, birthdate: null, bio: null, gender: null, passions: []},
};

export const usersSlice = createSlice({
 name: 'users',
  initialState,
 reducers: {
   addToken: (state, action) => {
    state.value.token = action.payload;
   },

   deleteToken: (state, action) => {
    state.value.token = null;
   }
 },
});

export const { addToken, deleteToken } = usersSlice.actions;
export default usersSlice.reducer;
