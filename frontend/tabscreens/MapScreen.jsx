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




    //calculate the position of the users
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }



    const users_positions_to_display = users_positions.map((user, i) => {
        let distance = calcCrow(user.location[0].latitude, user.location[0].longitude, latitude, longitude).toFixed(2)
        //distance inferior of 5 km or 500meters ? 
       
        if(distance < 0.50){
            return <Marker key={i} title={user.name} description={`à ${distance}m`} coordinate={{ latitude: user.location[0].latitude, longitude: user.location[0].longitude}} />
        }
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
