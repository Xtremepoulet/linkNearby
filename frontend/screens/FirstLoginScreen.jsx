import { Pressable, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReducerValue } from '../reducers/users';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { addLatitude, addLongitude } from '../reducers/users';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;



export default function FirstLoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const infoUser = useSelector((state) => state.users.value);


    useEffect(() => {
        verifyToken()
    }, [])


    const verifyToken = async () => {
        if (!infoUser.token) {
            return;
        }
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            dispatch(addLatitude(location.coords.latitude))
            dispatch(addLongitude(location.coords.longitude))
        }

        try {
            const response = await fetch(`${CONNECTION_BACKEND}/auth/verifyToken`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${infoUser.token}`
                }
            });
            const result = await response.json();

            if (result.result) {
                console.log('Token est toujours valide');
                getLocation()
                setLocation()
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator' }],
                });
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du token:', error);
        }
    };

    const setLocation = async () => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/setLocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${infoUser.token}`
            },
            body: JSON.stringify({
                latitude: infoUser.latitude,
                longitude: infoUser.longitude
            })
        })

        const result = await response.json();
        if (!result.result) {
            console.log('Erreur lors de la mise à jour de la localisation');
        }
    }





    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={logoLinkNearby} style={styles.logo} />
                <Text style={styles.h1}>LINK NEARBY</Text>
            </View>
            <View style={styles.body}>
                <Pressable
                    style={styles.button}
                    title="Go to SecondLoginScreen"
                    onPress={() => { navigation.navigate('signupScreen'), dispatch(deleteReducerValue()) }}
                >
                    <Text style={styles.text}>Créer un compte</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    title="Go to signin screen"
                    onPress={() => navigation.navigate('signinScreen')}
                >
                    <Text style={styles.text}>Connexion</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
        width: '100%',
    },
    h1: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: '50%'

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
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
        height: 70,
        margin: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFA53F',
    },
    body: {
        alignItems: 'center',
        height: '30%',
    }

})
