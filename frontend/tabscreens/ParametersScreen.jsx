import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteReducerValue, handleDeconnexion } from '../reducers/users';
import { UseDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ParametersScreen({ navigation }) {

    const dispatch = useDispatch();
    const user_token = useSelector((state) => state.users.value.token);
    const passions = useSelector((state) => state.users.value.passions);//sous forme de tableau 

    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('hey');
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    const [personal_informations, setPersonal_informations] = useState({});

    useEffect(() => {
        get_personnal_infos();
    }, [])

    const get_personnal_infos = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/user_personnal`, {
            method: 'GET',
            headers: { 'authorization': user_token },
        })

        const result = await fetching_data.json();
        if(result.result){
            setPersonal_informations(result.user)
        }
    }

    console.log(personal_informations)
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
        dispatch(handleDeconnexion());
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

            <View style={styles.cardView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.containerScroll}
                    >   

                        <View style={styles.container_champ}> 
                            <View style={styles.section_description}>
                                <Text style={styles.section_title}>Personal informations</Text>
                            </View>

                            <View style={styles.user_champ}>
                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Name</Text>
                                    <TextInput  style={styles.input_champ} value={personal_informations.name} editable={isEmailEditable}></TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Email</Text>
                                    <TextInput style={styles.input_champ} value={personal_informations.email} editable={isEmailEditable}></TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Password</Text>
                                    <TextInput style={styles.input_champ} value='evidement le password nest pas clear' editable={isEmailEditable}></TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Gender</Text>
                                    <TextInput style={styles.input_champ} value={personal_informations.email} editable={isEmailEditable}></TextInput>
                                </View>
                            </View>
                        </View>



                        {/* gestion de la biographie de lutilisateur */}
                        <View style={styles.container_champ}> 
                            <View style={styles.section_description}>
                                <Text style={styles.section_title}>Biographie</Text>
                            </View>
                            
                            <View style={styles.biographie_champ}>
                                <View>
                                    <TextInput>{personal_informations.bio}</TextInput>
                                </View>

                                <View style={styles.edit_button_container}>
                                    <TouchableOpacity style={styles.edit_button} >
                                        <Text>edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        {/* gestion des passions de lutilisateur */}
                        <View style={styles.container_champ}> 
                            <View style={styles.section_description}>
                                <Text style={styles.section_title}>Passions</Text>
                            </View>
                            
                            <View style={styles.passions_champ}>
            
                            </View>
                        </View>


                        <View style={styles.user_champ}>
                            <TextInput style={styles.input_champ} value="I am read only" editable={isEmailEditable}></TextInput>
                            <TouchableOpacity onPress={() => setIsEmailEditable(!isEmailEditable)} style={styles.button_champ} >
                                <Text style={styles.text_button}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.user_champ}>
                            <TextInput style={styles.input_champ} value="I am read only" editable={isEmailEditable}></TextInput>
                            <TouchableOpacity onPress={() => setIsEmailEditable(!isEmailEditable)} style={styles.button_champ} >
                                <Text style={styles.text_button}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.user_champ}>
                            <TextInput style={styles.input_champ} value="I am read only" editable={isEmailEditable}></TextInput>
                            <TouchableOpacity onPress={() => setIsEmailEditable(!isEmailEditable)} style={styles.button_champ} >
                                <Text style={styles.text_button}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.user_champ}>
                            <TextInput style={styles.input_champ} value="I am read only" editable={isEmailEditable}></TextInput>
                            <TouchableOpacity onPress={() => setIsEmailEditable(!isEmailEditable)} style={styles.button_champ} >
                                <Text style={styles.text_button}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.user_champ}>
                            <TextInput style={styles.input_champ} value="I am read only" editable={isEmailEditable}></TextInput>
                            <TouchableOpacity onPress={() => setIsEmailEditable(!isEmailEditable)} style={styles.button_champ} >
                                <Text style={styles.text_button}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => user_deconnexion()} style={styles.button} >
                                    <Text style={styles.text_button}>Deconnexion</Text>
                        </TouchableOpacity>
                                            
                        <TouchableOpacity style={styles.button} >
                                    <Text onPress={() => setModalVisible(true)} style={styles.text_button}>Supprimer le compte</Text>
                        </TouchableOpacity>

                </ScrollView>
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
        width: '100%',
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

    bottom_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },

    button : {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 40,
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
     
    cardView: {
        width: width,
        height: '70%',
    },

    containerScroll: {
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        backgroundColor: 'purple',
        padding: 30,
    },  

    container_champ: {
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        gap: 15,
    },

    user_champ: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
    },

    passions_champ: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        flexWrap: 'wrap',
        padding: 5,
        borderRadius: 5,
        borderColor: 'orange',
        gap: 30,
    },

    biographie_champ: {
        width: '100%',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 1,
        flexWrap: 'wrap',
        padding: 5,
        borderRadius: 5,
        borderColor: 'orange',
        gap: 30,
    },

    edit_button_container: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
    },

    edit_button: {
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 40,
        borderRadius: 50,
        padding: 5,
    },

    champ: {
        width: '80%', 
        display: 'flex',
    },

    text_description: {
        fontSize: 12,
        color: 'gray',
    },

    section_title: {
        fontSize: 16,
        color: 'white',
    },

    input_champ: {
        width: '100%',
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
    },

    button_champ: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 40,
        borderRadius: 5,
        padding: 5,
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
