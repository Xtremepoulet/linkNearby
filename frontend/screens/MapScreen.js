import React from 'react';

import { KeyboardAvoidingView, Image, StyleSheet, Text, View, Platform } from 'react-native';

export default function ProfileScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Text>map</Text>
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
        height: '100%'

    }

})