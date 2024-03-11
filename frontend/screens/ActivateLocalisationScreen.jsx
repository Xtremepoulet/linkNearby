import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import users, { addLatitude, addLongitude, turnOnLocation } from '../reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;


export default function ActivateLocalisationScreen({ navigation }) {

    const user_infos = useSelector((state) => state.users.value);
    const [isLocationActivated, setIsLocationActivated] = useState(false);
    const dispatch = useDispatch();

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [reload, setreload] = useState(false);
    //on active uniquement la localisation, on ne la met pas à jour
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        dispatch(turnOnLocation(true));
                        dispatch(addLatitude(location.coords.latitude))
                        dispatch(addLongitude(location.coords.longitude))

                        setIsLocationActivated(true);
                        setLatitude(location.coords.latitude);
                        setLongitude(location.coords.longitude);
                    });
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
            latitude: latitude,
            longitude: longitude,
            gender: user_infos.gender,
            uri: user_infos.uri,
        }

        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/user_informations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': user_infos.token },
            body: JSON.stringify(user_informations_to_send),
        })


        const result = await fetching_data.json();
        if (result.result) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigator' }],
            })
        };
    }


    const reload_page = () => {
        setreload(!reload);
    }

    //   const location_not_activate = 
    const location_not_activate = <View style={styles.container}>
        <View>
            <FontAwesome name='podcast' size={25} color='#F98F22' />
        </View>

        <View style={styles.message_container}>
            <Text>Pour profiter pleinement de l'application, la localisation a besoin d'être activé</Text>
        </View>

        <Pressable
            style={styles.button}
            title="Go to TabNavigator"
            onPress={() => reload_page()}

        >
            <Text style={styles.texteblanc}>Activer la localisation</Text>
        </Pressable>
    </View>



    const location_activate = <View style={styles.container_number2}>
        <View style={styles.header}>
            <Pressable
                onPress={() => navigation.navigate('ChoosePhotoScreen')}
            >
                <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
            </Pressable>
            <Text style={styles.headerText}>Finalise ton inscription</Text>
        </View>
        <View style={styles.bottom}>
            <Pressable
                style={styles.button}
                title="Go to Home"
                onPress={() => send_informations_to_back()}
            >
                <Text style={styles.texteblanc}>Finaliser l'inscription</Text>
            </Pressable>
        </View>
    </View>

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {isLocationActivated ? location_activate : location_not_activate}
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

    texteblanc: {
        color: 'white'
    },

    message_container: {
        width: '70%',

    },

    container_number2: {
        width: '100%',
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

    bottom: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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

})
