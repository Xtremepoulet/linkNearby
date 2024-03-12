import React, { useEffect, useState } from 'react';

import { KeyboardAvoidingView, Image, StyleSheet, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ProfileScreen({ navigation }) {

    const latitude = useSelector((state) => state.users.value.latitude);
    const longitude = useSelector((state) => state.users.value.longitude);


    const [users_positions, setUsers_positions] = useState([]);


    useEffect(() => {
        load_users_position();
    }, [])

    const load_users_position = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/users_position`);
        const result = await fetching_data.json();

        console.log(result.users)

        setUsers_positions(result.users);
    }




    //calculate the position of the users
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function toRad(Value) {
        return Value * Math.PI / 180;
    }



    const users_positions_to_display = users_positions.map((user, i) => {
        let distance = calcCrow(user.location[0].latitude, user.location[0].longitude, latitude, longitude).toFixed(2);

        const birthdate = new Date(user.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }


        if (distance < 0.50) {
            return (
                <Marker
                    key={i}
                    coordinate={{ latitude: user.location[0].latitude, longitude: user.location[0].longitude }}
                >
                    <Callout>
                        <View style={styles.descriptionContainer}>
                            <Image source={{ uri: user.uri }} style={styles.imageUser} />
                            <View style={styles.descriptionUser}>
                                <Text style={styles.descriptionName}>{user.name}, {age}</Text>
                                <View style={styles.descriptionPassionsContainer}>
                                    {user.passions.slice(0, 3).map((passion, i) => {
                                        return (
                                            <View key={i} style={styles.passionBody}>
                                                <Text style={styles.passionText}>{passion.name} {passion.emoji}</Text>
                                            </View>
                                        );
                                    })}


                                </View>
                            </View>
                        </View>
                    </Callout>
                </Marker>
            );
        }
    });


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}

            >
                {users_positions_to_display}
            </MapView>

        </KeyboardAvoidingView>

    );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: width,
        height: height
    },
    descriptionContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 5,
        height: height * 0.13,
        width: width * 0.60,
        // backgroundColor: 'blue',
        // justifyContent: 'space-between'
        alignItems: 'center',

    },
    imageUser: {
        width: width * 0.18,
        height: height * 0.09,
        borderRadius: 50,
        // width: '30%',
        // height: '100%',
        resizeMode: 'cover',


        // backgroundColor: 'red'
    },
    descriptionUser: {
        marginLeft: 15,
        // backgroundColor: 'red',
        width: '65%',
        height: '100%',

    },
    descriptionName: {
        fontSize: 16,
        fontWeight: 'bold',
        height: '20%',
    },
    descriptionPassionsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
        flexWrap: 'wrap',
        paddingTop: 5
    },
    passionText: {
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 4,
    },
    passionBody: {
        backgroundColor: '#F98F22',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 1,

    },

})

