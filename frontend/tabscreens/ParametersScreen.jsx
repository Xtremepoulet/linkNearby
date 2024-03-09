import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteReducerValue, handleDeconnexion } from '../reducers/users';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UseDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;

export default function ParametersScreen({ navigation }) {

    const dispatch = useDispatch();
    const user_token = useSelector((state) => state.users.value.token);
    const passions = useSelector((state) => state.users.value.passions);//sous forme de tableau 

    //infos qui seront renvoyé au backend
    const [gender, setGender] = useState(null);
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //il manque les passion qu'il faudra faire 
    //le password n'est pas en clear, gérer ca 


    const [modalVisible, setModalVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isValidModification, setIsValidModification] = useState(true);

    const [isBioEditable, setIsBioEditable] = useState(false);

    
    const [personal_informations, setPersonal_informations] = useState({});


    const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    // Minimum eight characters, at least one letter, one number and one special character:
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

            setGender(result.user.gender);
            setBio(result.user.bio);
            setName(result.user.name);
            setEmail(result.user.email);
    
            
        }
    }


    //enregistrement des modifications de l'utilisateurs
    const save_changes = async () => {
        if(email_regex.test(email) && bio.length < 500){

            //le password et les passions devront etre aussi misent à jours 
            const user_infos = {
                name,
                email,
                bio,
                gender,
            }

            const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/update_user_infos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': user_token },
                body: JSON.stringify(user_infos)
            })

            const result = await fetching_data.json();
            if(result.result){
                setIsEditable(false);
                setIsValidModification(true);
            }
        }else{
            setIsValidModification(false);
        }
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

        console.log(result)
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



    const confirm_changes = <View style={styles.container_changes}>
                                <TouchableOpacity onPress={() => save_changes()} style={styles.button} >
                                    <Text  style={styles.text_button}>Enregistrer les modifications</Text>
                                </TouchableOpacity>
                                {isValidModification ? '' : <Text style={styles.error_message}>Certains champs ne sont pas valide</Text>}
                            </View>

                            
                            

{/* <View> 
<TouchableOpacity onPress={() => setIsEditable(!isEditable)} style={styles.edit_button}>
    <FontAwesome name="user" size={24} color={'white'}/>
</TouchableOpacity>
</View> */}

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
                    <Image style={styles.image} source={{ uri: personal_informations.uri }}></Image>
                    <Text style={styles.username}>{personal_informations.name}</Text>
                </View>
            </View>
            <View style={styles.cardView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.containerScroll}
                    >   

                        <View> 
                            <TouchableOpacity onPress={() => setIsEditable(!isEditable)} style={styles.edit_button}>
                                <FontAwesome name="user" size={24} color={'white'}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container_champ}> 
                            <View style={styles.section_description}>
                                <Text style={styles.section_title}>Personal informations</Text>
                            </View>

                            <View style={styles.user_champ}>
                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Name</Text>
                                    <TextInput onChangeText={(value) => setName(value)} style={styles.input_champ} editable={isEditable}>{personal_informations.name}</TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Email</Text>
                                    <TextInput onChangeText={(value) => setEmail(value)} style={styles.input_champ} editable={isEditable}>{personal_informations.email}</TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Password</Text>
                                    <TextInput style={styles.input_champ} value='evidement le password nest pas clear' editable={isEditable}></TextInput>
                                </View>

                                <View style={styles.champ}>
                                    <Text style={styles.text_description}>Gender</Text>
                                    <View style={styles.gender_container}>
                                        <TouchableOpacity onPress={() => setGender('homme')} style={gender === 'homme' ? styles.gender_selected_button : styles.gender_nonSelected_button} >
                                            <Text style={styles.text_button}>Homme</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => setGender('femme')} style={gender === 'femme' ? styles.gender_selected_button : styles.gender_nonSelected_button} >
                                            <Text style={styles.text_button}>Femme</Text>
                                        </TouchableOpacity>
                                    </View>
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
                                    <TextInput onChangeText={(value) => setBio(value)} editable={isEditable}>{personal_informations.bio}</TextInput>
                                </View>
                                {/* <View style={styles.edit_button_container}>
                                    <TouchableOpacity onPress={() => setIsBioEditable(!isBioEditable)} style={styles.edit_button} >
                                        <Text>edit</Text>
                                    </TouchableOpacity>
                                </View> */}
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

                        {isEditable ? confirm_changes : ''}

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
                <TextInput onChangeText={(value) => setPassword(value)} placeholder="Mot de passe" style={styles.input} />
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
        backgroundColor: 'white',
    },

    h1: {
        fontSize: 22,
    },
                    
    top_container: {
        width: '100%',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 20,
        padding: 5,
        backgroundColor: 'orange',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
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
        width: 30,
        height: 30,
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
        // backgroundColor: 'purple',
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
        color: 'orange',
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

    gender_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    gender_selected_button: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
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

    container_changes: {
        width: '100%',
        alignItems: 'center',
    },

    error_message: {
        color: 'red',
        fontSize: 12,
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
