import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageCard from '../components/MessageCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';

const { width, height } = Dimensions.get('window');
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function MessagesScreen({ navigation }) {
    const user_token = useSelector((state) => state.users.value.token);
    const user_email = useSelector((state) => state.users.value.email);
    const isLoaded = useSelector((state) => state.users.value.isLoaded);
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchName, setSearchName] = useState('');

    const [lastMessage, setLastMessage] = useState([]);

    useEffect(() => {
        load_channels();
    }, [isLoaded]);

    const load_channels = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/channel/load_user_channel`, {
            method: 'GET',
            headers: { 'authorization': user_token },
        });

        const result = await fetching_data.json();
        setLastMessage(result.channelLastMessages)
        setUsers(result.users);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await load_channels();
        setRefreshing(false);
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));

    const message_card = filteredUsers.map((user, i) => {

        if (user.email !== user_email) {
            const lastMessageInfo = lastMessage.find(item => item.channel.users.includes(user._id));
            if (lastMessageInfo.lastMessage !== null) {
                return <MessageCard key={i} name={user.name} uri={user.uri} userId={user._id} lastMessage={lastMessageInfo.lastMessage} messageCount={lastMessageInfo.unreadMessagesCount}></MessageCard>;
            }
        }
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.textTitle}>Messages <FontAwesome name="comment" size={24} color={'#f0eae9'} /></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un utilisateur"
                    value={searchName}
                    onChangeText={(text) => setSearchName(text)}
                />
            </View>
            <ScrollView
                style={styles.scroll_container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {message_card}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        gap: 15,
    },
    header: {
        width: '100%',
        height: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F98F22',
        gap: 5,
    },
    scroll_container: {
        width: '95%',
    },
    input: {
        height: 40,
        width: '80%',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#f0eae9',
    },
    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5
    }
});
