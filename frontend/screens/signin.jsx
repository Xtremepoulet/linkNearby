import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { UseDispatch, useDispatch } from "react-redux";
import { addToken } from "../reducers/users";
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';


const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android

const Signin = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('cerisier.jeremy@gmail.com');
    const [password, setPassword] = useState('123@Lagune');
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



    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? height * 0.08 : height * 0.08} // Ajusté pour iOS
        >
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
                {/* top section */}
                <View style={styles.header}>
                    <Image source={logoLinkNearby} style={styles.logo} />
                    <Text style={styles.h1}>LINKNEARBY</Text>
                </View>
                {/* bottom section */}
                <View style={styles.body}>
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
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}


export default Signin;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    h1: {
        fontSize: width * 0.14,
        fontWeight: 'bold',
        color: 'black',
    },
    input_container: {
        width: width * 0.80,
        height: 50,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFA53F',
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
        height: '70%',
        width: '100%',

    },
    signup_button: {
        marginTop: 20,
        width: '40%',
        height: height * 0.05,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFA53F',
        borderRadius: 20,

    },
    text_button: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: 'white'
    }
});
