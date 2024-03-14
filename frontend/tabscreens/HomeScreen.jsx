import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, StatusBar, Button } from 'react-native';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/HomeCard';
import { RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';


import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android
import { ScrollView } from 'react-native';

import { io } from 'socket.io-client';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran

import { addLatitude, addLongitude, turnOnLocation, addNoReadMessages } from "../reducers/users";



export default function HomeScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([])
    const [sheetIndex, setSheetIndex] = useState(-1);
    const infoUser = useSelector((state) => state.users.value);
    // const token = useSelector((state) => state.users.value.token);
    const dispatch = useDispatch();


    const socket = io(CONNECTION_BACKEND, {
        query: { token: infoUser.token },
        transports: ['websocket'],
    });



    useEffect(() => {
        socket.emit('authenticate', { token: infoUser.token });
        // Écouter les changements de statut d'utilisateur
        socket.on('userStatusChanged', ({ userId, isConnected }) => {
            // Mettre à jour l'état de l'application ici si nécessaire
        });

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            socket.off('userStatusChanged');
        };
    }, []);



    // Fonction pour rafraichir la liste des utilisateurs en tirant vers le bas
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUsers();
        await getUnreadmessagescount()
        setRefreshing(false);
    }, []);


    useEffect(() => {
        fetch(`${CONNECTION_BACKEND}/user/authorisation`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },
        })
        getUsers()
        getLocation()
        getUnreadmessagescount()
    }, [infoUser.isLoaded])


    const getUnreadmessagescount = async () => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/unreadmessagescount`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },
        });
        const result = await response.json();

        if (result.result) {
            dispatch(addNoReadMessages(result.unreadMessagesCount));

        }
    }


    // Recuperation les utilisateurs
    const getUsers = async () => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },

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
                userId={user.userId}
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

    const sheetRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ["70%"], []);
    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    return (
        <GestureHandlerRootView style={styles.modalContainer}>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : height * -0.01}
            >
                <SafeAreaView style={[styles.container, Platform.OS === "android" && { flex: 1 }]} edges={['top']}>

                    <View style={styles.header}>
                        <View style={styles.containerFiltre}>
                            <Pressable onPress={() => handleSnapPress(0)}>
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

            </KeyboardAvoidingView>

            <BottomSheet
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                ref={sheetRef}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.contentBottomContainer}>
                    <View style={styles.BottomContainerTitle}>
                        <Text style={styles.BottomTitle}>Linkers idéal</Text>
                        <FontAwesome name="binoculars" size={24} style={styles.arrowIcon} />
                    </View>
                    <View style={styles.BottomContainerAllFiltrer}>
                        <View style={styles.BottomContainerGenre}>
                            <Text style={styles.BottomGenreTitle}>Je recherche...</Text>
                            <View>
                                <Text>Homme</Text>
                                <Text>Femme</Text>
                                <Text>Tout le monde</Text>
                            </View>
                        </View>
                        <View style={styles.BottomContainerAge}>
                            <Text>Age</Text>
                            <Text>25 ans</Text>
                            <View>
                                <Text>BAR</Text>
                            </View>
                        </View>
                        <View style={styles.BottomContainerDistance}>
                            <Text>Distance</Text>
                            <Text>120km</Text>
                            <View>
                                <Text>BAR</Text>
                            </View>
                        </View>
                    </View>

                    <Text>FILTRER</Text>
                </BottomSheetView>
            </BottomSheet>

        </GestureHandlerRootView>
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
    modalContainer: {
        flex: 1,
    },
    contentBottomContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 20,
    },
    BottomContainerTitle: {
        width: width,
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },


})
