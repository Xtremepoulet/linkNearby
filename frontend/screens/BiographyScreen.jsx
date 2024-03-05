import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineBiography } from '../reducers/users';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';


export default function BiographyScreen({ navigation }) {
    const dispatch = useDispatch();
    const [bio, setBio] = useState('');


    const handleNext = () => {
        dispatch(defineBiography(bio));
        navigation.navigate('ChoosePhotoScreen')
    };
    const Container = Platform.OS === 'ios' ? SafeAreaView : View;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <Container style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.navigate('PassionScreen')}
                    >
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </Pressable>
                    <Text style={styles.headerText}>Parles nous de toi</Text>
                </View>
                <Text style={styles.textAccroche}>Raconte-nous ton histoire ! Partage avec nous ce qui te fait vibrer, tes hobbies et tout ce qui te rend unique. 🌟</Text>
                <View style={styles.containerText}>
                    <TextInput multiline={true}
                        style={styles.bodyText} maxLength={500} onChangeText={(value) => {
                            setBio(value),
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }} value={bio} placeholder='parles nous de toi 🔫' ></TextInput>
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
            </Container>

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
        height: 30,

    },
    arrowIcon: {
        marginRight: 10,
        height: 30,
        width: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // width: '100%',
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
        width: 250,
        height: 50,
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
        height: '100%'
    },

    containerText: {
        marginTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 300,
        height: 200,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F98F22',
    },
    textAccroche: {
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    }
});
