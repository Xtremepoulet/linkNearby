import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useRef } from 'react';
import Constants from 'expo-constants';
import moment from 'moment/moment.js';
//socket import 
import { socket } from '../sockets.js';
import { io } from 'socket.io-client';

const { width, height } = Dimensions.get('window');
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ConversationScreen({ navigation, route }) {

    const { userId, name, uri } = route.params; //route.param nous permet de passer des props lors du chargement de la navigation

    const user_token = useSelector((state) => state.users.value.token);

    const scrollViewRef = useRef();

    const [message, setMessage] = useState('');
    const [channelMessage, setChannelMessage] = useState([]);
    const [messageReceived, setMessageReceived] = useState(false);

    const [refreshing, setRefreshing] = useState(false);


    const socket = io(CONNECTION_BACKEND, {
        query: { token: user_token },
        transports: ['websocket'],
    });



    const handleContentSizeChange = () => {
        // Scroll to the bottom whenever the content size changes
        scrollViewRef.current.scrollToEnd({ animated: true });
    };



    useEffect(() => {

        scrollViewRef.current.scrollToEnd({ animated: true });
        //permet de scroll tout en bas du composant quand le composant se load 

        load_messages();//pas ouf mais fonctionne

        load_messages();

    }, []);

    const load_messages = async () => {

        const user_informations_to_send = {
            distant_user_id: userId,
        }

        const fetching_data = await fetch(`${CONNECTION_BACKEND}/channel/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': user_token },
            body: JSON.stringify(user_informations_to_send)
        })

        const result = await fetching_data.json();
        if (result.result) {
            setChannelMessage(result.messages)
        }
    }



    const send_message = () => {
        socket.emit('send private message', ({ distant_user_id: userId, message: message }));
        setMessage('');
    }



    const onRefresh = async () => {
        setRefreshing(true);
        await load_messages();
        setRefreshing(false);
    };

    const messages_to_display = channelMessage.map((user, i) => {
        if (user.user_id !== userId) {
            return <View key={i} style={styles.alignRight} >
                <Text multiline={true} style={styles.msg}>{user.message}</Text>
                <Text style={styles.date}>{moment(user.CreatedAt).calendar()}</Text>
            </View>
        } else {
            return <View key={i} style={styles.alignLeft} >
                <Image style={styles.image} source={{ uri: uri }} />
                <View>
                    <Text multiline={true} style={styles.distant_msg}>{user.message}</Text>
                    <Text style={styles.date}>{moment(user.CreatedAt).calendar()}</Text>
                </View>
            </View>
        }
    })


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} onPress={() => navigation.goBack()} />
                <Image style={styles.image} source={{ uri: uri }} />
                <Text style={styles.headerText}>{name}</Text>
            </View>

            <ScrollView
                ref={scrollViewRef}//ref to scrollViewRef with useRef
                onContentSizeChange={handleContentSizeChange}//when the content size change, we call our function
                contentContainerStyle={styles.container_messages}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.containerScroll}>
                    {messages_to_display}
                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.footer}>
                <FontAwesome name="camera" size={24} style={styles.arrowIcon} />
                <TextInput value={message} onChangeText={(value) => setMessage(value)} multiline={true} style={styles.button} placeholder='Votre message...' />
                <FontAwesome onPress={() => send_message()} name="paper-plane" size={24} style={styles.arrowIcon} />
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
        backgroundColor: '#6567F010',
        gap: 10,
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
        justifyContent: 'flex-end',
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
        shadowColor: '#000',
        shadowOffset: { width: -30, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 7,
        gap: 5,
        backgroundColor: '#6567F010',
    },
    msg: {
        borderWidth: 1,
        borderColor: '#FBA81E',
        borderRadius: 10,
        backgroundColor: '#FBA81E',
        color: 'white',
        padding: 5,
        maxWidth: '75%',
        overflow: 'hidden',
    },
    distant_msg: {
        borderWidth: 1,
        borderColor: '#6865F230',
        borderRadius: 10,
        backgroundColor: '#6865F290',
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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    alignRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 5,
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    date: {
        fontSize: 11,
        color: '#000000',
    }
});
