import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineGender } from '../reducers/users';

const windowHeight = Dimensions.get('window').height;

export default function ChooseGenderScreen({ navigation }) {
    const dispatch = useDispatch();
    const [selectedGender, setSelectedGender] = useState('');

    const selectGender = (gender) => {
        setSelectedGender(gender);
    }

    const nextPage = () => {
        if (selectedGender) {
            dispatch(defineGender(selectedGender));
            navigation.navigate('BirthdateScreen')
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('ChooseNameScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Quel est ton sexe ?</Text>
            </View>
            <View style={styles.bottom}>
                <View style={styles.gender_container}> 
                    <Pressable
                        style={[styles.genderButton, selectedGender === 'femme' ? styles.selectedButton : null]}
                        title="choose femme"
                        onPress={() => selectGender('femme')}
                    >
                        <Text style={styles.texteblanc}>femme</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.genderButton, selectedGender === 'homme' ? styles.selectedButton : null]}
                        title="choose male"
                        onPress={() => selectGender('homme')}
                    >
                        <Text style={styles.texteblanc}>homme</Text>
                    </Pressable>
                </View>
                <View style={styles.next_container}>
                    <Pressable
                        style={styles.button}
                        title="Go to PassionsScreen"
                        onPress={() => nextPage()}
                    >
                        <Text style={styles.texteblanc}>Next</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    arrowIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 0.6,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },

    gender_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    genderButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '40%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#c7c3c3',
        marginTop: 20,
    },
    selectedButton: {
        backgroundColor: '#f27d3d',
    },

    next_container : {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
