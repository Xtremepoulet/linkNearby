import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: null, token: null, birthdate: null, bio: null, gender: null, passions: [], name: null, uri: null, location: false },
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
      console.log(state.value.name)
    },
    defineGender: (state, action) => {
      state.value.gender = action.payload;
      console.log(state.value.gender)
    },
    defineBirthdate: (state, action) => {
      state.value.birthdate = action.payload;
      console.log(state.value.birthdate)
    },
    addPassions: (state, action) => {
      state.value.passions.push(action.payload);
    },
    removePassions: (state, action) => {
      state.value.passions = state.value.passions.filter((item) => item !== action.payload);
    },
    defineBiography: (state, action) => {
      state.value.bio = action.payload;
      console.log(state.value.bio)
    },

    defineUri: (state, action) => {
      state.value.uri = action.payload;
    },

    turnOnLocation: (state, action) => {
      state.value.location = action.payload;
    }
  },
});

export const { addToken, deleteToken, defineName, defineGender, defineBirthdate, addPassions, removePassions, defineBiography, defineUri, turnOnLocation } = usersSlice.actions;
export default usersSlice.reducer;
