import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';
import Constants from 'expo-constants';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function HomeScreen({ navigation }) {

    const token = useSelector((state) => state.users.value.token);
    
    const user_infos = { name: 'hello'}
    useEffect(() => {
        fetch(`${CONNECTION_BACKEND}/user/authorisation`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': token },
        })
    }, [])
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>home</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
