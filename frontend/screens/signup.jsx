import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from "react-redux";
import { addToken, addEmail } from "../reducers/users";
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran

const Signup = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password_is_valid, setPassword_is_valid] = useState(true);
    const [email_is_valid, setEmail_is_valid] = useState(true);



    const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    // Minimum eight characters, at least one letter, one number and one special character:
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;



    const user_signup = async () => {
        if (!email_regex.test(email) || !password_regex.test(password)) {
            setEmail_is_valid(false);
            setPassword_is_valid(false);
            return;
        }

        const user_infos = { email: email, password: password }

        const fetching_data = await fetch(`${CONNECTION_BACKEND}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_infos)
        })

        const user_response = await fetching_data.json();
        if (user_response.result) {
            dispatch(addToken(user_response.token))
            dispatch(addEmail(email))
            navigation.navigate('ChooseNameScreen')
        }
    }

    return (
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
                        <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * 0.15}
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
                   
                        <TouchableOpacity style={styles.signup_button} onPress={() => user_signup()}>
                                <Text style={styles.text_button}>Signup</Text>
                        </TouchableOpacity>
                    
                </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
    );
}


export default Signup;


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
