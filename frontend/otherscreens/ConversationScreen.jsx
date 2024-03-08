import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { addPassions, removePassions } from '../reducers/users';
import Constants from 'expo-constants';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android


export default function PassionScreen({ navigation }) {

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </Pressable>
                    <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    <Text style={styles.headerText}>Adrian</Text>
                    <Text>passion</Text>
                </View>

                <View style={styles.containerEmoji}>
                    <ScrollView contentContainerStyle={styles.containerScroll}>
                        <Text multiline={true} style={styles.msg}>bonjour je suis adrian et je suis un gros mangeur de taboulet</Text>

                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.button}
                        placeholder='oui'
                    >
                    </TextInput>
                    <Text>la</Text>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'purple'

    },
    arrowIcon: {
        marginRight: 10,
        marginBottom: 2,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 12,
        borderBottomWidth: 1,
        width: '80%',
        fontSize: 18,
        paddingHorizontal: 10,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: 20,
        width: width * 0.70,
        height: height * 0.05,

    },
    texteblanc: {
        color: 'white'
    },
    passionBody: {
        padding: 5,
        margin: 2,
        backgroundColor: '#ECEEEE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,

    },
    passionTexte: {
        color: 'black',
        fontSize: 13,
    },
    containerEmoji: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        marginTop: 20,
        height: height * 0.68,
        backgroundColor: 'pink'
    },
    containerScroll: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'blue',
        justifyContent: 'flex-start',


    },
    passionSelected: {
        backgroundColor: '#F98F22',

    },
    compteur: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F98F22',
        marginTop: 20,

    },
    image: {
        height: 45,
        width: 45,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        height: '3%',

    },
    msg: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F98F22',
        color: 'white',
        padding: 5,
        maxWidth: '75%',
        overflow: 'hidden',

    },
});
