
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import HomeScreen from './tabscreens/HomeScreen';
import MapScreen from './tabscreens/MapScreen';
import ParametersScreen from './tabscreens/ParametersScreen';
import MessagesScreen from './tabscreens/MessagesScreen';

import Signup from './screens/signup.jsx';
import Signin from './screens/signin.jsx';
import FirstLoginScreen from './screens/FirstLoginScreen.jsx';
import ChooseNameScreen from './screens/ChooseNameScreen.jsx';
import BirthdateScreen from './screens/BirthdateScreen.jsx';
import PassionScreen from './screens/PassionScreen.jsx';
import BiographyScreen from './screens/BiographyScreen.jsx';
import ActivateLocalisationScreen from './screens/ActivateLocalisationScreen.jsx';
import ChooseGenderScreen from './screens/ChooseGenderScreen.jsx';
import ChoosePhotoScreen from './screens/ChoosePhotoScreen.jsx';

import ConversationScreen from './otherscreens/ConversationScreen.jsx';
import ProfilScreen from './screens/ProfilScreen.jsx';



ChooseGenderScreen

//redux persist 
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




const TabNavigator = (unreadMessagesCount) => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Map') {
          iconName = 'map';
        } else if (route.name === 'Parameters') {
          iconName = 'gear';
        } else if (route.name === 'Messages') {
          iconName = 'comments';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#F98F22',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ tabBarBadge: unreadMessagesCount > 0 ? unreadMessagesCount : null }} />
      <Tab.Screen name="Parameters" component={ParametersScreen} />
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FirstLoginScreen" component={FirstLoginScreen} />
            <Stack.Screen name="signinScreen" component={Signin} />
            <Stack.Screen name="signupScreen" component={Signup} />
            <Stack.Screen name="ChooseNameScreen" component={ChooseNameScreen} />
            <Stack.Screen name="BirthdateScreen" component={BirthdateScreen} />
            <Stack.Screen name="PassionScreen" component={PassionScreen} />
            <Stack.Screen name="BiographyScreen" component={BiographyScreen} />
            <Stack.Screen name="ActivateLocalisationScreen" component={ActivateLocalisationScreen} />
            <Stack.Screen name="ChooseGenderScreen" component={ChooseGenderScreen} />
            <Stack.Screen name="ChoosePhotoScreen" component={ChoosePhotoScreen} />
            <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
            <Stack.Screen name="ProfilScreen" component={ProfilScreen} />



            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}