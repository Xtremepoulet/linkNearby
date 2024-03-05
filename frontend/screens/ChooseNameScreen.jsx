import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineName } from '../reducers/users';

const windowHeight = Dimensions.get('window').height;

export default function ChooseNameScreen({ navigation }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const regex = /^[a-zA-Z\- ]{3,20}$/;

    const capitalizeAfterSpecialChars = (string) => {
        return string.replace(/[-\s]+(.)?/g, function (match, group1) {
            if (group1) {
                return match.toUpperCase();
            } else {
                return match;
            }
        });
    }

    const handleNameChange = (value) => {
        setName(capitalizeAfterSpecialChars(value));
    }
    const handleTextChange = (inputText) => {
        // Regex pour vérifier si l'entrée contient uniquement des lettres
        if (/^[a-zA-Z]*$/.test(inputText)) {
            setText(inputText);
        }
    };


    const nextPage = () => {
        if (regex.test(name)) {
            dispatch(defineName(name));
            navigation.navigate('ChooseGenderScreen')
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('signupScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Comment tu t'appelles ?</Text>
            </View>
            <View style={styles.bottom}>
                <TextInput
                    placeholder='Name'
                    style={styles.input}
                    onChangeText={(value) => handleNameChange(value)}
                    value={name}
                />
                <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => nextPage()}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: windowHeight * 0.1,
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
    }
});
