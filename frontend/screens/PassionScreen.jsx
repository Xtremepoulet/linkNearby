import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import Constants from 'expo-constants';
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

const windowHeight = Dimensions.get('window').height;

export default function PassionScreen({ navigation }) {

    const [passions, setPassions] = useState([])

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
                setPassions(result.passions);
            } else {
                console.log('Erreur de connexion');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const listePassions = passions.map((passion, index) => {
        return (
            <View key={index} style={styles.passionBody}>
                <Pressable
                    onPress={() => console.log('ok')}>
                    <Text style={styles.passionTexte}>{passion.name}  {passion.emoji}</Text>

                </Pressable>
            </View>
        )
    })





    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('BirthdateScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Partage nous tes passions</Text>
            </View>
            <Text>Selectionne nous jusqu'à (nb) de passions</Text>

            <View style={styles.containerEmoji}>
                <ScrollView contentContainerStyle={styles.containerScroll}>
                    {listePassions}
                </ScrollView>
            </View>


            <View style={styles.bottom}>

                <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => navigation.navigate('BiographyScreen')}
                >
                    <Text style={styles.texteblanc}>Next</Text>
                </Pressable>
            </View>
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
        marginBottom: 10,
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // marginTop: windowHeight * 0.6, // Descend légèrement la vue bottom
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
        width: '80%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#F98F22',
        marginTop: 20,
    },
    texteblanc: {
        color: 'white'
    },
    passionBody: {
        padding: 5,
        margin: 2,
        backgroundColor: '#F98F22',
        borderRadius: 20,
        // width: 'auto',
        // height: 20,
        alignItems: 'center', // Centre le contenu horizontalement
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    passionTexte: {
        color: 'white',
        fontSize: 13,
    },
    containerEmoji: {
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    containerScroll: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
