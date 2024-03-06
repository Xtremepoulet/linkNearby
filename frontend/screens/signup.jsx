import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../reducers/users";
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

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
            navigation.navigate('ChooseNameScreen')
        }
    }
    
    const Container = Platform.OS === 'ios' ? SafeAreaView : View;
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20} // Ajusté pour iOS
        >
            <Container style={styles.container}>
                {/* top section */}
                <View style={styles.header}>
                    <Image source={logoLinkNearby} style={styles.logo} />
                    <Text onPress={() => {
                        navigation.navigate('ChooseNameScreen')
                    }} style={styles.h1}>LINKNEARBY</Text>
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
                    <TouchableOpacity style={styles.signup_button} onPress={() => user_signup()}>
                        <Text style={styles.text_button}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </KeyboardAvoidingView>

    );
}


export default Signup;


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
