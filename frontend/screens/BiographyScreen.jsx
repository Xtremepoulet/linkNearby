import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineBiography } from '../reducers/users';
import { useState } from 'react';
import * as Haptics from 'expo-haptics'; // Pour les vibrations

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android


export default function BiographyScreen({ navigation }) {
    const dispatch = useDispatch();
    const [bio, setBio] = useState('');

    const handleBioChange = (value) => {
        setBio(value);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handleNext = () => {
        dispatch(defineBiography(bio));
        navigation.navigate('ChoosePhotoScreen')
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? height * -0.02 : height * -0.01}
        >
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.navigate('PassionScreen')}
                    >
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.headerText}>Parles nous de toi</Text>
                </View>
                <Text style={styles.textAccroche}>Raconte-nous ton histoire ! Partage avec nous ce qui te fait vibrer, tes hobbies et tout ce qui te rend unique. 🌟</Text>
                <View>
                    <View style={styles.containerText}>
                        <TextInput multiline={true}
                            style={styles.bodyText} maxLength={500} onChangeText={(value) => handleBioChange(value)} value={bio} placeholder='parles nous de toi 🔫' ></TextInput>
                    </View>
                    <Text style={styles.compteur}>{bio.length}/500</Text>
                </View>
                <View style={styles.bottom}>
                    <Pressable
                        style={styles.button}
                        title="Go to PassionsScreen"
                        onPress={() => handleNext()}
                    >
                        <Text style={styles.texteblanc}>Next</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        height: height * 0.05,
    },
    arrowIcon: {
        marginRight: 10,
        width: '100%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
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
        paddingVertical: 12,
        width: width * 0.70,
        height: height * 0.05,
        borderRadius: 5,
        backgroundColor: '#F98F22',
        marginTop: 20,
    },
    texteblanc: {
        color: 'white'
    },
    bodyText: {
        fontSize: 18,
        paddingHorizontal: 10,
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
    },
    containerText: {
        marginTop: 40,
        width: width * 0.9,
        height: height * 0.30,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F98F22',
    },
    textAccroche: {
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    compteur: {
        color: '#F98F22',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    }
});
