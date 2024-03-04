import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

export default function ActivateLocalisationScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>Activate localistation screen</Text>

            <Pressable
                style={styles.button}
                title="Go to TabNavigator"
                onPress={() => navigation.navigate('TabNavigator')}
            >
                <Text>go to navigator</Text>
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
