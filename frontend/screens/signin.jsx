import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { UseDispatch, useDispatch } from "react-redux";
import { addToken } from "../reducers/users";
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import { Keyboard, Animated } from 'react-native';




const Signin = ({ navigation }) => {
    const [headerHeight] = useState(new Animated.Value(1));

    const dispatch = useDispatch();

    const [email, setEmail] = useState('cerisier.jeremy@gmail.com');
    const [password, setPassword] = useState('123@Jeremy');
    const [password_is_valid, setPassword_is_valid] = useState(true);
    const [email_is_valid, setEmail_is_valid] = useState(true);

    const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    // Minimum eight characters, at least one letter, one number and one special character:
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


    const user_signin = async () => {
        if (!email_regex.test(email)) {
            setEmail_is_valid(false);
            return
        }
        if (!password_regex.test(password)) {
            setPassword_is_valid(false);
            return
        }



        const response = await fetch(`${CONNECTION_BACKEND}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.result) {
            dispatch(addToken(result.token));
            navigation.navigate('TabNavigator');
            setEmail_is_valid(true);
            setPassword_is_valid(true);
        } else {
            console.log('erreur de connexion')
            setEmail_is_valid(false);
            setPassword_is_valid(false);
        }
    }

    const Container = Platform.OS === 'ios' ? SafeAreaView : View;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setTimeout(() => {
                Animated.timing(headerHeight, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }).start();
            }); // Délai de 100ms
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(headerHeight, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);



    return (

        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     style={styles.container}
        //     keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Ajusté pour iOS
        // >
        <Container style={styles.container}>
            {/* top section */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        transform: [
                            {
                                translateY: headerHeight.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-130, 0], // Déplace l'en-tête vers le haut
                                }),
                            },
                        ],
                    },
                ]}
            >
                <Image source={logoLinkNearby} style={styles.logo} />
                <Text style={styles.h1}>LINKNEARBY</Text>
            </Animated.View>

            {/* bottom section */}
            <Animated.View
                style={[
                    styles.body,
                    {
                        transform: [
                            {
                                translateY: headerHeight.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-300, 0], // Déplace l'en-tête vers le haut
                                }),
                            },

                        ],
                    },
                ]}
            >
                <View style={styles.input_container}>
                    <TextInput value={email} onChangeText={(value) => setEmail(value.toLocaleLowerCase())} style={styles.text_input} placeholder="Email..."></TextInput>
                    {!email_is_valid && <Text style={styles.invalid_message}>Email non valide</Text>}
                </View>
                <View style={styles.input_container}>
                    <TextInput value={password} onChangeText={(value) => setPassword(value)} style={styles.text_input} placeholder="password..."></TextInput>
                    {!password_is_valid && <Text style={styles.invalid_message}>Mot de passe incorrect</Text>}
                </View>
                <TouchableOpacity style={styles.signup_button} onPress={() => user_signin()}>
                    <Text style={styles.text_button}>Connect</Text>
                </TouchableOpacity>
            </Animated.View>
        </Container>
        // </KeyboardAvoidingView>

    );
}


export default Signin;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        // backgroundColor: 'red',
    },
    h1: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        // backgroundColor: 'blue',

    },
    input_container: {
        width: '80%',
        height: 50,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFA53F',
        // elevation: 10,
    },
    invalid_message: {
        color: '#b91414',
        fontSize: 12,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    body: {
        alignItems: 'center',
        // backgroundColor: 'yellow',
        height: '40%',
    },
    text_input: {
        width: '100%',
        height: '100%',
        padding: 10,
        color: 'white',

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '50%',
        height: '70%',
        width: '100%',
        // backgroundColor: 'green',
    },
    signup_button: {
        marginTop: 20,
        width: '40%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFA53F',
        borderRadius: 20,

    },
    text_button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});
