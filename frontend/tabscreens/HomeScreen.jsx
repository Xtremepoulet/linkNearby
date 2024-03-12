import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, StatusBar } from 'react-native';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/HomeCard';
import { RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';


import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android
import { ScrollView } from 'react-native';

import { socket } from '../sockets.js';
import { io } from 'socket.io-client';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran

import { addLatitude, addLongitude, turnOnLocation } from "../reducers/users";



export default function HomeScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([])

    const infoUser = useSelector((state) => state.users.value);
    // const token = useSelector((state) => state.users.value.token);

    const dispatch = useDispatch();

    useEffect(() => {

    }, []);


    // Fonction pour rafraichir la liste des utilisateurs en tirant vers le bas
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUsers();
        setRefreshing(false);
    }, []);


    useEffect(() => {
        fetch(`${CONNECTION_BACKEND}/user/authorisation`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },
        })
        getUsers()
        getLocation()
    }, [])

    // Recuperation les utilisateurs
    const getUsers = async () => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();

        if (result.result) {
            const currentUserEmail = infoUser.email;
            const filteredUsers = result.users.filter(user => user.email !== currentUserEmail);
            setUsers(filteredUsers);
        }
    };

    const usersList = users.map((user) => {
        let distance = user.location[0] ? getDistance(
            { latitude: infoUser.latitude, longitude: infoUser.longitude },
            { latitude: user.location[0].latitude, longitude: user.location[0].longitude }
        ) : null;

        // Convertir en kilomètres avec au moins 500 mètres comme minimum
        distance = distance < 500 ? 500 : distance;
        const distanceDisplay = distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`;

        const birthdate = new Date(user.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        return (
            <Card
                key={user.email}
                picture={user.uri}
                isConnected={user.isConnected}
                name={user.name}
                age={age}
                passions={user.passions}
                email={user.email}
                bio={user.bio}
                distance={distanceDisplay}
            />
        );
    });




    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
                (location) => {
                    dispatch(turnOnLocation(true));
                    dispatch(addLatitude(location.coords.latitude))
                    dispatch(addLongitude(location.coords.longitude))
                });
        }
    }



    return (
        <>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * -0.01}
            >
                <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

                    <View style={styles.header}>
                        <View style={styles.containerFiltre}>

                            <Pressable onPress={() => console.log('aie!')}>
                                <FontAwesome name="binoculars" size={24} style={styles.arrowIcon} />
                            </Pressable>
                        </View>
                        <View style={styles.logoMarque}>
                            <Image source={logoLinkNearby} style={styles.logo} />
                            <Text style={styles.headerText}>LINK NEARBY</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.containertextBody}>
                            <Text style={styles.textBody}>Linkers</Text>
                        </View>

                        <View style={styles.cardView}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.containerScroll}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            >
                                {usersList}

                            </ScrollView>
                        </View>

                    </View>



                </SafeAreaView>

            </KeyboardAvoidingView >
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        width: width,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 10,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    arrowIcon: {

    },
    containerFiltre: {
        width: '20%',
        // backgroundColor: 'yellow',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoMarque: {
        flexDirection: 'row',
        width: '70%',
        // backgroundColor: 'red',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'start',
    },
    body: {
        // backgroundColor: 'red',
        width: width,
        height: '92%',
        alignItems: 'center',
    },
    containertextBody: {
        // backgroundColor: 'yellow',
        width: width,
        height: '5%',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    cardView: {
        // backgroundColor: 'orange',
        width: width * 0.90,
        height: '97%',
    },
    containerScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },


})
