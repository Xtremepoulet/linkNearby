import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageCard from '../components/MessageCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function MessagesScreen({ navigation }) {
    const user_token = useSelector((state) => state.users.value.token);
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        load_channels();
    }, []);

    const load_channels = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/channel/load_user_channel`, {
            method: 'GET',
            headers: { 'authorization': user_token },
        });

        const result = await fetching_data.json();
        setUsers(result.users);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await load_channels();
        setRefreshing(false);
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));

    const message_card = filteredUsers.map((user, i) => {
        return <MessageCard key={i} name={user.name} uri={user.uri} userId={user._id}></MessageCard>;
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
            <Text style={styles.textTitle}>Discussions <FontAwesome name="comment" size={24} /></Text>
            <View style={styles.stretch}>
                <TextInput
                    style={styles.border}
                    placeholder="Rechercher un utilisateur"
                    value={searchName}
                    onChangeText={(text) => setSearchName(text)}
                />
            </View>
            <ScrollView
                style={styles.oui}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Text style={styles.textBody}>Messages</Text>
                {message_card}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    oui: {
        flex: 1,
        width: '95%',
        height: '20%',
    },
    border: {
        borderRadius: 5,
        height: '85%',
        width: 300,
        backgroundColor: 'white'
    },
    stretch: {
        height: '6%',
        width: 300,
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
