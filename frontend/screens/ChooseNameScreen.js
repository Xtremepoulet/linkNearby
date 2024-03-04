import React from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PassionsScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <FontAwesome />
            <View style={styles.header}>
                <Text style={styles.headerText}>Comment tu t'appelles ?</Text>
                <TextInput placeholder='Name' style={styles.input}></TextInput>
            </View>

            <Pressable
                style={styles.button}
                title="Go to PassionsScreen"
                onPress={() => navigation.navigate('BirthdateScreen')}
            >
                <Text style={styles.texteblanc}>Next</Text>
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
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
});
