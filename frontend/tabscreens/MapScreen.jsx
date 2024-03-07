import React, { useEffect, useState } from 'react';

import { KeyboardAvoidingView, Image, StyleSheet, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native';
import { useSelector } from 'react-redux';


const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

const ProfileScreen = ({ navigation }) => {

    const latitude = useSelector((state) => state.users.value.latitude);
    const longitude = useSelector((state) => state.users.value.longitude);


    const [users_positions, setUsers_positions] = useState([]);

    
    useEffect(() => {
            load_users_position();
    }, [])

    const load_users_position = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/users_position`);
        const result = await fetching_data.json();
       
        setUsers_positions(result.users);
        
    }


    const users_positions_to_display = users_positions.map((user, i) => {
        return <Marker key={i} coordinate={{ latitude: user.location[0].latitude, longitude: user.location[0].longitude}} />  
    })

    


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


export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    img: {
        width: '100%',
        height: '100%'

    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

})
