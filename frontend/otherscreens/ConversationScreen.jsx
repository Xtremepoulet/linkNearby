import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');

export default function ConversationScreen({ navigation, route }) {

    const { userId, name, uri } = route.params; //route.param nous permet de passer des props lors du chargement de la navigation

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} onPress={() => navigation.goBack()} />
                <Image style={styles.image} source={{ uri : uri }} />
                <Text style={styles.headerText}>{name}</Text>
                <Text>passion</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container_messages}>
                <View style={styles.containerScroll}>
                    <View style={styles.alignLeft} >
                        <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                        <Text multiline={true} style={styles.msg}>oui</Text>
                    </View>

                    <View style={styles.alignRight} >
                        <Text multiline={true} style={styles.msg}>Super bien et toi?</Text>
                    </View>
                    {/* Add other messages here */}
                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.footer}>
                <FontAwesome name="camera" size={24} style={styles.arrowIcon} />
                <TextInput multiline={true} style={styles.button} placeholder='Votre message...' />
                <FontAwesome name="paper-plane" size={24} style={styles.arrowIcon} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1
    },
    arrowIcon: {
        paddingRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        width: width * 0.80,
        height: height * 0.05,
    },
    container_messages: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    containerScroll: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        height: 45,
        width: 45,
    },
    imageMsg: {
        height: 35,
        width: 35,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    msg: {
        borderWidth: 1,
        borderColor: '#F98F22',
        borderRadius: 10,
        backgroundColor: '#F98F22',
        color: 'white',
        padding: 5,
        maxWidth: '75%',
        overflow: 'hidden',
    },
    alignLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-start'
    },
    alignRight: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
});
