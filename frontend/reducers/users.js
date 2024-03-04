import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {username: 'yaya'},
};

export const usersSlice = createSlice({
 name: 'users',
  initialState,
 reducers: {
   addUser: (state, action) => {

   },
 },
});

export const { addUser} = usersSlice.actions;
export default usersSlice.reducer;
