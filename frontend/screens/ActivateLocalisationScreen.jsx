import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import users, { turnOnLocation } from '../reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;


export default function ActivateLocalisationScreen({ navigation }) {

    const user_infos = useSelector((state) => state.users.value);
    const dispatch = useDispatch();

    const [reload, setreload] = useState(false);
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
      

      const reload_page = () => {
        setreload(!reload);
      }
      
    //   const location_not_activate = 
      const location_not_activate = <View style={styles.container}>
                                        <View>
                                            <FontAwesome name='podcast' size={25} color='#F98F22'/>
                                        </View>

                                        <View style={styles.message_container}>
                                            <Text>Pour profiter pleinement de l'application, la localisation a besoin d'être activé</Text>
                                        </View>
                                        
                                        <Pressable
                                            style={styles.button}
                                            title="Go to TabNavigator"
                                            onPressIn={() => reload_page()}
                                            // onPress={() => send_informations_to_back()}
                                        >
                                            <Text style={styles.texteblanc}>Activer la localisation</Text>
                                        </Pressable>
                                    </View>
    


    // const location_activate = 

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >   
            <View style={styles.container_number2}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.navigate('ChoosePhotoScreen')}
                    >
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.headerText}>Finalise ton inscription</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '50%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#F98F22',
        padding: 5,
    },
    texteblanc: {
        color: 'white'
    },

    message_container: {
        width: '70%',

    },

    container_number2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        backgroundColor: 'white',
        gap: 20,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },

      arrowIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 
})
