import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: null, token: null, birthdate: null, bio: null, gender: null, passions: [], name: null, uri: null, location: false, longitude: 0, latitude: 0, noReadMessages: 0, isLoaded: false },
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

    },

    defineUri: (state, action) => {
      state.value.uri = action.payload;
    },

    turnOnLocation: (state, action) => {
      state.value.location = action.payload;
    },

    addLatitude: (state, action) => {
      state.value.latitude = action.payload;
    },

    addLongitude: (state, action) => {
      state.value.longitude = action.payload;
    },

    deleteReducerValue: (state, action) => {
      state.value = { email: null, token: null, birthdate: null, bio: null, gender: null, passions: [], name: null, uri: null, location: false, longitude: 0, latitude: 0 };
    },
    addEmail: (state, action) => {
      state.value.email = action.payload;
    },

    //delete le token de l'utilisateur si il se deconnecte
    handleDeconnexion: (state, action) => {
      state.value.token = null;
    },
    addNoReadMessages: (state, action) => {
      state.value.noReadMessages = action.payload;
    },
    updateIsLoaded: (state, action) => {
      state.value.isLoaded = action.payload;
    },

  },
});

export const { updateIsLoaded, addNoReadMessages, addEmail, addToken, deleteToken, defineName, defineGender, defineBirthdate, addPassions, removePassions, defineBiography, defineUri, turnOnLocation, addLatitude, addLongitude, deleteReducerValue, handleDeconnexion } = usersSlice.actions;
export default usersSlice.reducer;
