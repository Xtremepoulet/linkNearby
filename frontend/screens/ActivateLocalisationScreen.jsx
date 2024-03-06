import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import users, { turnOnLocation } from '../reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;


export default function ActivateLocalisationScreen({ navigation }) {

    const user_infos = useSelector((state) => state.users.value);
    const dispatch = useDispatch();
    //on active uniquement la localisation, on ne la met pas à jour
    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
     
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            console.log(location);
            dispatch(turnOnLocation(true));
          } 
        })();
      }, []);

      const send_informations_to_back = async () => {
        // { email: null, token: null, birthdate: null, bio: null, gender: null, passions: [], name: null, uri: null, location: false },

        const user_informations_to_send = {
            name: user_infos.name,
            birthdate: user_infos.birthdate,
            passions: user_infos.passions,
            bio: user_infos.bio,
            latitude: 10,
            longitude: 10,
            gender: user_infos.gender,
            uri: user_infos.uri,
        }
        
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/user_informations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : user_infos.token },
            body: JSON.stringify(user_informations_to_send),
        })
        
        console.log(user_infos.token)
        const result = await fetching_data.json();
        console.log(result)
        navigation.navigate('TabNavigator');
      }
      

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>Activate localistation screen</Text>

            <Pressable
                style={styles.button}
                title="Go to TabNavigator"
                onPress={() => send_informations_to_back()}
            >
                <Text>go to navigator</Text>
            </Pressable>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    img: {
        width: '100%',
        height: '50%'

    },
    text: {
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
    },
    input: {
        margin: 12,
        borderBottomWidth: 1,
        width: '80%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'red',
    },
    texteblanc: {
        color: 'white'
    }
})
