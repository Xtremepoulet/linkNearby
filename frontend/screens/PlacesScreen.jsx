import { KeyboardAvoidingView, StyleSheet, Text, Platform } from 'react-native';



export default function HomeScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Text>John Doe's places</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        margin: 12,
        borderBottomWidth: 1,
        width: '80%'
    },

    view: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        width: '70%',


    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'red',
        width: 70,
    },

    texteblanc: {
        color: 'white'
    }
})
