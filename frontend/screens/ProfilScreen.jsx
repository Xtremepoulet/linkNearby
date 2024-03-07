import { View, Text, Pressable, Image, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/HomeCard';
import { useState } from 'react';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran

export default function ProfilScreen({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { userEmail, name, birthdate, location, bio, gender, passions, picture, isConnected } = route.params;


    const passionsUser = passions.map((passion) => {
        return (
            <View key={passion.id} style={styles.passionBody}>
                <Text style={styles.passionText}>{passion.name} {passion.emoji}</Text>
            </View>
        );
    })

    const handleMessage = () => {
        alert("Cest pas encore développé connard !!!!!!!!");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * -0.01}
        >
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

                <View style={styles.header}>
                    <View style={styles.containerFiltre}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                        </Pressable>
                    </View>
                    <View style={styles.logoMarque}>
                        <Image source={logoLinkNearby} style={styles.logo} />
                        <Text style={styles.headerText}>LINK NEARBY</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.cardView}>
                        <View style={styles.topView}>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <View style={styles.pictureContainer}>
                                        <Image source={{ uri: picture }} style={styles.picture} />
                                    </View>
                                </TouchableOpacity>
                                <Modal
                                    animationType="fade"
                                    transparent={false}
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(false)}
                                >
                                    <View style={styles.fullScreenContainer}>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Image source={{ uri: picture }} style={styles.fullScreenImage} />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                            <View style={styles.containerProfilView}>
                                <View style={styles.profilView}>
                                    <Text style={styles.informationPrenom}>{name} ,{birthdate} ans</Text>
                                    <Text>a 500 m</Text>
                                </View>
                                <Pressable
                                    style={styles.buttonMessage}
                                    title="Go to message"
                                    onPress={() => handleMessage()}
                                >
                                    <Text style={styles.texteButtonMessage}>Envoi un message</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.bottomView}>
                            <View style={styles.bioView}>
                                <Text style={styles.bioTextTitre}>Biographie</Text>
                                <Text multiline={true} style={styles.bioText}>{bio}</Text>
                            </View>
                            <View style={styles.passionsView}>
                                <Text style={styles.passionsTextTitre}>Passions</Text>
                                <View style={styles.containerPassion}>
                                    {passionsUser}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height
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
    body: {
        width: width,
        height: '92%',
        alignItems: 'center',
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
        height: '100%',
        alignItems: 'center',
        justifyContent: 'start',
    },
    cardView: {
        width: width * 0.90,
    },
    topView: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
    },
    profilView: {
        width: '100%',
        paddingLeft: 20,
        marginTop: 20,
    },
    informationPrenom: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    informationLocalisation: {
        color: 'black',
        fontSize: 14,
    },
    bioView: {
        width: '100%',
        height: '70%',
        marginBottom: 20,
    },
    passionsView: {
        width: '100%',
        height: '50%',
    },
    passionBody: {
        backgroundColor: '#F98F22',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 2,
    },
    passionText: {
        fontSize: 13,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    containerPassion: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F98F22',
        height: height * 0.15,

    },
    bioTextTitre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    passionsTextTitre: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bioText: {
        fontSize: 14,
        paddingHorizontal: 5,
        width: '100%',
        height: '80%',
        textAlignVertical: 'top',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F98F22',
    },
    card: {
        width: width * 0.45,
        height: height * 0.30,
        borderRadius: 10,
    },
    picture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    bottomView: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-between',
    },
    containerProfilView: {
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonMessage: {
        width: '70%',
        height: 30,
        backgroundColor: '#F98F22',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
    },
    texteButtonMessage: {
        color: 'black',
        fontSize: 14,
    },
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Fond noir pour un effet plein écran
    },
    fullScreenImage: {
        width: width, // Largeur à 100% de l'écran
        height: height, // Hauteur à 100% de l'écran
        resizeMode: 'contain', // S'assure que l'image est entièrement visible
    },

})