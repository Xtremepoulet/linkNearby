import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: null, token: null, birthdate: null, bio: null, gender: null, passions: [], name: null },
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
    },

    defineName: (state, action) => {
      state.value.name = action.payload;
    },
    defineGender: (state, action) => {
      state.value.name = action.payload;
    },
    defineBirthdate: (state, action) => {
      state.value.birthdate = action.payload;
    },
    definePassions: (state, action) => {
      state.value.passions.push(action.payload);
    },
    defineBiography: (state, action) => {
      state.value.bio = action.payload;
    },
  },
});

export const { addToken, deleteToken, defineName, defineGender, defineBirthdate, definePassions, defineBiography } = usersSlice.actions;
export default usersSlice.reducer;
