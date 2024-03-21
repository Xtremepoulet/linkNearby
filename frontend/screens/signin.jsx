import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch } from "react-redux";
import { addToken, addEmail } from "../reducers/users";
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';


const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android

const Signin = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            dispatch(addEmail(email));
            // navigation.navigate('TabNavigator');
            setEmail_is_valid(true);
            setPassword_is_valid(true);
            navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigator' }],
            });
        } else {
            console.log('erreur de connexion')
            setEmail_is_valid(false);
            setPassword_is_valid(false);
        }
    }



    return (

        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * 0.18} // Ajusté pour iOS
            >
                {/* top section */}
                <View style={styles.header}>
                    <Image source={logoLinkNearby} style={styles.logo} />
                    <Text style={styles.h1}>LINKNEARBY</Text>
                </View>
                {/* bottom section */}
                <View style={styles.body}>
                    <View style={styles.input_container}>
                        <TextInput value={email} onChangeText={(value) => setEmail(value.toLocaleLowerCase())} style={styles.text_input} placeholder="Email..."
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#ffffff"
                            autoCorrect={false}></TextInput>
                        {!email_is_valid && <Text style={styles.invalid_message}>Email non valide</Text>}
                    </View>
                    <View style={styles.input_container}>
                        <TextInput value={password} onChangeText={(value) => setPassword(value)} style={styles.text_input} placeholder="Mot de passe..."
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor="#ffffff"
                            autoCorrect={false}></TextInput>
                        {!password_is_valid && <Text style={styles.invalid_message}>Mot de passe incorrect</Text>}
                    </View>

                    <TouchableOpacity style={styles.signup_button} onPress={() => user_signin()}>
                        <Text style={styles.text_button}>Connect</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export default Signin;


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
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
        width: '80%',
        display: 'flex',
        height: 50,
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
        display: 'flex',
        gap: 20,
        height: '30%',
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
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFA53F',
        borderRadius: 20,
    },
    text_button: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});
