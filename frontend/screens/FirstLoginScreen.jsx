import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

export default function FirstLoginScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>First Login Screen</Text>

            <Pressable
                style={styles.button}
                title="Go to SecondLoginScreen"
                onPress={() => navigation.navigate('signupScreen')}
            >
                <Text>Go to Second Login Screen</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                title="Go to SecondLoginScreen"
                onPress={() => navigation.navigate('signinScreen')}
            >
                <Text>Connexion</Text>
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

})
