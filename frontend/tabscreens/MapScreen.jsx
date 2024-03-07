import React from 'react';

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

    console.log(longitude)

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
                     <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
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
