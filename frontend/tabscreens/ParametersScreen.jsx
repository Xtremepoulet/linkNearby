import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { deleteReducerValue } from '../reducers/users';
import { UseDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ParametersScreen({ navigation }) {

    const dispatch = useDispatch();
    const user_token = useSelector((state) => state.users.value.token);

    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('hey');

    useEffect(() => {
        get_personnal_infos();
    }, [])

    const get_personnal_infos = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/user_personnal`, {
            method: 'GET',
            headers: { 'authorization': user_token },
        })

        const result = await fetching_data.json();
        console.log(result)
    }


    //modal gestion 
    const handleClose = () => {
        setModalVisible(false);
      };


      //delete the user account 
    const delete_account = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/delete_user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': user_token },
            body: JSON.stringify({password})
        })
        const result = await fetching_data.json();
        if(result.result){
            dispatch(deleteReducerValue());
            navigation.navigate('signinScreen');
        }
    }



    //deconnecte l'utilisateur
    const user_deconnexion = () => {
        dispatch(deleteReducerValue());
        navigation.navigate('signinScreen');
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.top_container}>
                <View style={styles.header}>
                    <Image source={logoLinkNearby} style={styles.logo} />
                    <Text style={styles.h1}>LINKNEARBY</Text>
                </View>
                <View style={styles.photo_container}>
                    <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    <Text style={styles.username}>Name</Text>
                </View>
            </View>

            <View style={styles.middle_container}>
                
            </View>

            <View style={styles.bottom_container}>
                <TouchableOpacity onPress={() => user_deconnexion()} style={styles.button} >
                        <Text style={styles.text_button}>Deconnexion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} >
                        <Text onPress={() => setModalVisible(true)} style={styles.text_button}>Supprimer le compte</Text>
                </TouchableOpacity>
            </View>


        <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput placeholder="Mot de passe" style={styles.input} />
                <TouchableOpacity style={styles.modal_button} activeOpacity={0.8}>
                    <Text onPress={() => delete_account()} style={styles.textButton}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClose()} style={styles.modal_button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Fermer</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>


        
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },

    top_container: {
        height: '30%',
        backgroundColor: 'yellow',
        display: 'flex',
        paddingTop: 20,
        padding: 5,
    },

    header: {
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },

    photo_container: {
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'blue',
        padding: 5,
    },

    image : {
        width: '30%',
        height: '85%',
        borderRadius: 50,
    },

    username: {
        fontSize: 18,
        color: 'white',
    },

    middle_container: {
        height: '50%',
        backgroundColor: 'red',
    },

    bottom_container: {
        height: '20%',
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 20,
    },

    button : {
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: '25%',
        borderRadius: 5,
        padding: 5,
    },

    text_button : {
        color: 'white',
    },

    logo : {
        width: 25,
        height: 25,
        borderRadius: 5,
    },

    //modal gestion at this point for the css
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: '40%',
      },

      input: {
        width: 150,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 16,
      },

      textButton: {
        color: '#ffffff',
        height: 24,
        fontWeight: '600',
        fontSize: 15,
      },

      modal_button : {
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: '20%',
        borderRadius: 5,
        padding: 5,
    },
    
})
