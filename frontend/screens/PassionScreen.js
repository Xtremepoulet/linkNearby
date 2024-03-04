import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

export default function PassionScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>Passions Screen</Text>

            <Pressable
                style={styles.button}
                title="Go to Biography"
                onPress={() => navigation.navigate('BiographyScreen')}
            >
                <Text>go to Choose ur Biography area</Text>
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
    texteblanc: {
        color: 'white'
    }
})
