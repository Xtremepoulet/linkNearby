import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useRef } from 'react';
import Constants from 'expo-constants';
import moment from 'moment/moment.js';
//socket import 
import { io } from 'socket.io-client';
import { updateIsLoaded } from '../reducers/users';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ConversationScreen({ navigation, route }) {

    const dispatch = useDispatch();

    const { userId, name, uri } = route.params; //route.param nous permet de passer des props lors du chargement de la navigation

    const user_token = useSelector((state) => state.users.value.token);
    const isLoaded = useSelector((state) => state.users.value.isLoaded);
    const scrollViewRef = useRef();

    const [message, setMessage] = useState('');
    const [channelMessage, setChannelMessage] = useState([]);
    const [messageReceived, setMessageReceived] = useState(false);


    const [refreshing, setRefreshing] = useState(false);

    const handleContentSizeChange = () => {
        // Scroll to the bottom whenever the content size changes
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    const socket = io(CONNECTION_BACKEND, {
        query: { token: user_token },
        transports: ['websocket'],
    });

    useEffect(() => {

        scrollViewRef.current.scrollToEnd({ animated: true });
        //permet de scroll tout en bas du composant quand le composant se load 
        load_messages();//pas ouf mais fonctionne
        update_notifications();

        const handleMessageReceived = (message) => {

            if (message.toUserId !== userId.toString()) {
                setChannelMessage((currentMessages) => [...currentMessages, message]);
            }
        };

        // Configuration de l'écouteur pour les nouveaux messages
        socket.on('message received', handleMessageReceived);

        // Nettoyage : retirer l'écouteur lorsque le composant est démonté
        return () => {
            socket.off('message received', handleMessageReceived);
        };
    }, [userId]);


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


    const update_notifications = async () => {

        const informations_to_send = {
            distant_user_id: userId,
        }
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/channel/update_notifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': user_token },
            body: JSON.stringify(informations_to_send)
        })
        const result = await fetching_data.json();
    }


    const send_message = () => {
        if (!message || message.trim() === '') {
            return;
        }
        const messageData = {
            token: user_token,
            distant_user_id: userId,
            message: message,
        };

        const localMessage = {
            id: Date.now().toString(),
            message: message,
            createdAt: new Date(),
            isLocal: true,
        };

        setChannelMessage(currentMessages => [...currentMessages, localMessage]);
        socket.emit('send private message', messageData);
        setMessage('');
    };




    const onRefresh = async () => {
        setRefreshing(true);
        await load_messages();
        setRefreshing(false);
    };

    const messages_to_display = channelMessage.map((messageData, index) => {
        const isUserMessage = messageData.user_id === userId;
        const messageStyle = isUserMessage ? styles.msg : styles.distant_msg;
        const containerStyle = isUserMessage ? styles.alignLeft : styles.alignRight;
        const key = messageData.id || `msg-${index}`;

        // Configuration personnalisée pour la méthode .calendar()
        const calendarFormat = {
            lastDay: '[Hier à] HH:mm',  // Format pour hier
            sameDay: '[Aujourd\'hui à] HH:mm',  // Format pour aujourd'hui
            nextDay: '[Demain à] HH:mm',  // Format pour demain
            lastWeek: '[le] dddd [à] HH:mm',  // Format pour la semaine dernière
            nextWeek: 'dddd [à] HH:mm',  // Format pour la semaine prochaine
            sameElse: 'DD/MM/YYYY [à] HH:mm'  // Format pour toutes les autres dates
        };
        return (
            <View key={key} style={containerStyle}>
                {isUserMessage && <Image style={styles.image} source={{ uri }} />}
                <View style={styles.messageDate}>
                    <Text style={messageStyle}>{messageData.message}</Text>
                    <Text style={styles.date}>{moment(messageData.CreatedAt).calendar(null, calendarFormat)}</Text>
                </View>
            </View>
        );
    });


    const handleGoBack = () => {
        dispatch(updateIsLoaded(!isLoaded));
        navigation.navigate('Messages');
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} onPress={() => {
                    handleGoBack();
                }} />
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
                <TextInput value={message} onChangeText={(value) => setMessage(value)} multiline={true} style={styles.input} placeholder='Votre message...' />
                <FontAwesome onPress={() => send_message()} name="paper-plane" size={24} style={styles.arrowIcon} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
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
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        width: '80%',
        padding: 3,
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
        borderRadius: 50,
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
        maxWidth: '80%',  // Limite la largeur maximale à 75% de la largeur du conteneur
        overflow: 'hidden',
        alignSelf: 'flex-start',  // Alignez au début (pour les messages de l'utilisateur actuel)
        margin: 5,  // Ajoute un peu d'espace autour de chaque message
    },
    distant_msg: {
        borderWidth: 1,
        borderColor: '#6865F230',
        borderRadius: 10,
        backgroundColor: '#6865F290',
        color: 'white',
        padding: 5,
        maxWidth: '70%',
        width: '100%',  // Limite la largeur maximale à 75% de la largeur du conteneur
        overflow: 'hidden',
        alignSelf: 'flex-end',  // Alignez au début (pour les messages distants)
        margin: 5,  // Ajoute un peu d'espace autour de chaque message
    },
    alignLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        gap: 5,
        width: '100%',
        justifyContent: 'flex-start',
    },
    alignRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 5,
        gap: 5,
        width: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: 'white',
    },
    date: {
        fontSize: 11,
        color: '#000000',
    },
    messageDate: {

    }
});
