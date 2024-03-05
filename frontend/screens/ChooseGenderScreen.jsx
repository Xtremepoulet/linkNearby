import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { defineGender } from '../reducers/users';

const windowHeight = Dimensions.get('window').height;

export default function ChooseGenderScreen({ navigation }) {
    const dispatch = useDispatch();
    const [gender, setGender] = useState('');

    const femme = () => {
        setGender('femme')
    }

    const homme = () => {
        setGender('homme')
    }




    const nextPage = () => {
        if (gender) {
            dispatch(defineGender(gender));
            navigation.navigate('BirthdateScreen')
        } else {

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
                    style={styles.genderButton}
                    title="choose femme"
                    onPress={() => femme()}
                >
                    <Text style={styles.texteblanc}>femme</Text>
                </Pressable>
                <Pressable
                    style={styles.genderButton}
                    title="choose male"
                    onPress={() => homme()}
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
        backgroundColor: 'blue',
        marginTop: 20,
    }
});
