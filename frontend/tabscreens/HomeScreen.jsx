import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, StatusBar, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Slider } from '@miblanchard/react-native-slider';
import Card from '../components/HomeCard';
import { RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

import * as Notifications from 'expo-notifications';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';
import { addLatitude, addLongitude, turnOnLocation, addNoReadMessages } from "../reducers/users";

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;
const { width, height } = Dimensions.get('window');


export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([])
    const infoUser = useSelector((state) => state.users.value);
    const [gender, setGender] = useState('all');
    const [ageValueSlider, setAgeValueSlider] = useState(58);
    const [distanceValueSlider, setDistanceValueSlider] = useState(1000);
    const [filteredUsers, setFilteredUsers] = useState([]);




    const socket = io(CONNECTION_BACKEND, {
        query: { token: infoUser.token },
        transports: ['websocket'],
    });


    useEffect(() => {
        socket.emit('authenticate', { token: infoUser.token });
        socket.on('userStatusChanged', ({ userId, isConnected }) => {
        });

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
        registerForPushNotificationsAsync();

    }, [infoUser.isLoaded])


    async function registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        postTokenNotification(token);
    }


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

    const postTokenNotification = async (tokenNotification) => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/setTokenNotification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },
            body: JSON.stringify({ token: tokenNotification }),
        });
    }


    // Recuperation les utilisateurs
    const getUsers = async () => {
        try {
            const response = await fetch(`${CONNECTION_BACKEND}/user/users`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization': infoUser.token },
            });
            const result = await response.json();
            if (result.result) {
                const currentUserEmail = infoUser.email;
                const filteredUsers = result.users.filter(user => user.email !== currentUserEmail);
                setFilteredUsers(filteredUsers);
                setUsers(filteredUsers)
            }
        }
        catch (error) {
            alert('erreur de chargement')
        }
    };


    const applyFilters = () => {
        const usersFiltered = users.filter(user => {
            // Filtre par genre
            const genderMatch = gender === 'all' || user.gender === gender;

            // Calculer l'âge de l'utilisateur
            const birthdate = new Date(user.birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const m = today.getMonth() - birthdate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }
            const ageMatch = age <= ageValueSlider;

            // Calculer la distance et vérifier si elle correspond au filtre
            const distance = user.location[0] ? getDistance(
                { latitude: infoUser.latitude, longitude: infoUser.longitude },
                { latitude: user.location[0].latitude, longitude: user.location[0].longitude }
            ) : Infinity;
            const distanceMatch = distance <= distanceValueSlider;

            return genderMatch && ageMatch && distanceMatch;
        });

        setFilteredUsers(usersFiltered);
    };

    const usersList = filteredUsers.map((user) => {
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
                uri={user.uri}
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

    const snapPoints = useMemo(() => ["50%", "70%"], []);
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
                            <Pressable onPress={() => handleSnapPress(1)}>
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
                // onChange={handleSheetChange}
                index={-1}
                ref={sheetRef}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.contentBottomContainer}>
                    <View style={styles.BottomContainerTitle}>
                        <Text style={styles.BottomTitle}>Linkers idéal</Text>
                    </View>
                    <View style={styles.BottomContainerAllFiltrer}>
                        <View style={styles.gender_container}>
                            <TouchableOpacity onPress={() => setGender('homme')} style={gender === 'homme' ? styles.gender_selected_button : styles.gender_nonSelected_button} >
                                <Text style={styles.text_button}>Homme</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender('femme')} style={gender === 'femme' ? styles.gender_selected_button : styles.gender_nonSelected_button} >
                                <Text style={styles.text_button}>Femme</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setGender('all')} style={gender === 'all' ? styles.gender_selected_button : styles.gender_nonSelected_button} >
                                <Text style={styles.text_button}>All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.age_container}>
                            <Text>{`Age < ${ageValueSlider}ans`}</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={18}
                                maximumValue={99}
                                minimumTrackTintColor="#F98F22"
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#F98F22"
                                step={10}
                                value={ageValueSlider}
                                onValueChange={value => setAgeValueSlider(value)}
                            />
                        </View>
                        <View style={styles.BottomContainerDistance}>
                            <Text>{`distance ${'<'} ${distanceValueSlider}m`}</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={500}
                                maximumValue={2000}//2000 km 
                                minimumTrackTintColor="orange"
                                maximumTrackTintColor="#000000"
                                thumbTintColor="orange"
                                step={250}
                                value={distanceValueSlider}
                                onValueChange={value => setDistanceValueSlider(value)}
                            />
                        </View>
                        <TouchableOpacity style={styles.filter_button} onPress={() => applyFilters()}>
                            <Text style={styles.text_button}>Filtrer</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection: 'row',
        width: width,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
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
    containerFiltre: {
        width: '20%',
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
        backgroundColor: '#F98F2210',
        borderRadius: 20,
        gap: 50,
    },
    BottomContainerTitle: {
        width: width,
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: 20,
    },
    BottomTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F98F22',
    },
    BottomContainerAllFiltrer: {
        width: '90%',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        gap: 30,
    },
    gender_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gender_selected_button: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F98F22',
        height: 30,
        borderRadius: 5,
        padding: 5,
    },
    gender_nonSelected_button: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        height: 30,
        borderRadius: 5,
        padding: 5,
    },
    age_container: {
        width: '80%',
    },
    BottomContainerDistance: {
        width: '80%'
    },
    filter_button: {
        width: '40%',
        height: 40,
        alignSelf: 'center',
        backgroundColor: '#F98F22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    text_button: {
        color: 'white',
    },
})
