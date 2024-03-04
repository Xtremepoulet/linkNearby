
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ParametersScreen from './screens/ParametersScreen';
import MessagesScreen from './screens/MessagesScreen';
import FirstLoginScreen from './screens/FirstLoginScreen';
import SecondLoginScreen from './screens/SecondLoginScreen';
import ChooseNameScreen from './screens/ChooseNameScreen';
import BirthdateScreen from './screens/BirthdateScreen';
import PassionScreen from './screens/PassionScreen';
import BiographyScreen from './screens/BiographyScreen';
import ActivateLocalisationScreen from './screens/ActivateLocalisationScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




const TabNavigator = () => {
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
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Parameters" component={ParametersScreen} />
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstLoginScreen" component={FirstLoginScreen} />
        <Stack.Screen name="SecondLoginScreen" component={SecondLoginScreen} />
        <Stack.Screen name="ChooseNameScreen" component={ChooseNameScreen} />
        <Stack.Screen name="BirthdateScreen" component={BirthdateScreen} />
        <Stack.Screen name="PassionScreen" component={PassionScreen} />
        <Stack.Screen name="BiographyScreen" component={BiographyScreen} />
        <Stack.Screen name="ActivateLocalisationScreen" component={ActivateLocalisationScreen} />


        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}