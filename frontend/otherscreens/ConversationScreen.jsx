import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width, height } = Dimensions.get('window');

export default function ConversationScreen({ navigation }) {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} onPress={() => navigation.goBack()} />
                <Image style={styles.image} source={require('../assets/profile.png')} />
                <Text style={styles.headerText}>Adrian</Text>
                <Text>passion</Text>
            </View>
            <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                <ScrollView contentContainerStyle={styles.containerEmoji}>

                    <View style={styles.containerScroll}>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Salut! comment ça va?</Text>
                        </View>
                        <View style={styles.alignRight} >
                            <Text multiline={true} style={styles.msg}>Super bien et toi?</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>
                        <View style={styles.align} >
                            <Image style={styles.imageMsg} source={require('../assets/profile.png')} />
                            <Text multiline={true} style={styles.msg}>Dure journée mais ça peut aller ma grand-mère est morte empallée par le cactus en bas des escalier mais ça peut aller lolilol</Text>
                        </View>


                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <FontAwesome name="camera" size={24} style={styles.arrowIcon} />
                    <TextInput style={styles.button} placeholder='Votre message...' />
                    <FontAwesome name="paper-plane" size={24} style={styles.arrowIcon} />
                </View>
            </KeyboardAwareScrollView>
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
    containerEmoji: {
        width: '100%',
        height: height * 0.77,
        justifyContent: 'flex-end'
    },
    containerScroll: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    align: {
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
