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
                <Text style={styles.headerText}>foufoune ou zbeub zbeub</Text>
            </View>
            <View style={styles.bottom}>
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
    },
    genderButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'purple',
        marginTop: 20,
    },
    selectedButton: {
        backgroundColor: 'black',

    },
});
