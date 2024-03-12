import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { TouchableOpacity, Text } from 'react-native-gesture-handler';

const BottomPopup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <>
            <TouchableOpacity style={styles.popupButton} onPress={togglePopup}>
                <Text style={styles.popupButtonText}>Show Popup</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={togglePopup}
            >
                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                        {/* Add your popup components here */}
                        <Text style={styles.popupText}>This is the popup content.</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    popupButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 20,
    },
    popupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        maxWidth: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    popupText: {
        textAlign: 'center',
    },
});

export default BottomPopup;