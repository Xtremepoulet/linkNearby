import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { addPassions, removePassions } from '../reducers/users';
import Constants from 'expo-constants';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
const windowHeight = Dimensions.get('window').height;


export default function PassionScreen({ navigation }) {

    const [passions, setPassions] = useState([])
    const dispatch = useDispatch();
    const userPassions = useSelector((state) => state.users.value.passions);


    useEffect(() => {
        getPassions();
    }
        , []);

    const getPassions = async () => {
        try {
            const response = await fetch(`${CONNECTION_BACKEND}/user/passions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.result) {
                setPassions(result.passions)
            } else {
                console.log('Erreur de connexion');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSetPassion = (passion) => {
        if (userPassions.includes(passion)) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            dispatch(removePassions(passion));
        } else if (userPassions.length < 10) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            dispatch(addPassions(passion));
        }
    }

    const handleNext = () => {
        if (userPassions.length >= 3) {
            navigation.navigate('BiographyScreen');
        } else {
            alert('Il faut selectionner au moins 3 passions');
        }
    }

    const listePassions = passions
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((passion, index) => {
            const isSelected = userPassions.includes(passion._id);
            return (
                <Pressable key={index} onPress={() => handleSetPassion(passion._id)} style={[styles.passionBody, isSelected && styles.passionSelected]}>
                    <Text style={styles.passionTexte}>{passion.name} {passion.emoji}</Text>
                </Pressable>
            );
        });


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.navigate('BirthdateScreen')}
                    >
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.headerText}>Partage nous tes passions</Text>
                </View>
                <Text>Choisis jusqu'à 10 passions</Text>
                <Text style={styles.compteur}>{userPassions.length}</Text>

                <View style={styles.containerEmoji}>
                    <ScrollView contentContainerStyle={styles.containerScroll}>
                        {listePassions}
                    </ScrollView>
                </View>
                <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => handleNext()}
                >
                    <Text style={styles.texteblanc}>Next</Text>
                </Pressable>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
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
        backgroundColor: '#F98F22',
        marginTop: 20,
        height: 50,
        width: 200,

    },
    texteblanc: {
        color: 'white'
    },
    passionBody: {
        padding: 5,
        margin: 2,
        backgroundColor: '#ECEEEE',
        borderRadius: 20,
        alignItems: 'center', // Centre le contenu horizontalement
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
        width: '100%',
        marginTop: 20,
        height: windowHeight * 0.65,
    },
    containerScroll: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    passionSelected: {
        backgroundColor: '#F98F22',
    },
    compteur: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F98F22',
        marginTop: 20,
        // marginBottom: 20,
    }
});
