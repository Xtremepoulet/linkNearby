import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android
import { ScrollView } from 'react-native';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;


export default function HomeScreen({ navigation }) {
    const token = useSelector((state) => state.users.value.token);

    const user_infos = { name: 'hello' }
    useEffect(() => {
        fetch(`${CONNECTION_BACKEND}/user/authorisation`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': token },
        })
    }, [])

    const picture = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsfGVufDB8fDB8fHww'

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * -0.01}
        >
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

                <View style={styles.header}>
                    <View style={styles.containerFiltre}>
                        <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                    </View>
                    <View style={styles.logoMarque}>
                        <Image source={logoLinkNearby} style={styles.logo} />
                        <Text style={styles.headerText}>LINK NEARBY</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.textBody}>
                        <Text>Linkers</Text>
                    </View>

                    <View style={styles.cardView}>
                        <ScrollView contentContainerStyle={styles.containerScroll}>
                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => console.log("oui")}>
                                    <View style={styles.profilPicture}>
                                        <Image uri={picture} style={styles.picture} />
                                        <View style={styles.informationProfile}>
                                            <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                                            <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>




                        </ScrollView>
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
        backgroundColor: 'blue',
    },
    header: {
        backgroundColor: 'green',
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
    arrowIcon: {

    },
    containerFiltre: {
        width: '10%',
        backgroundColor: 'yellow',
        height: '100%',
    },
    logoMarque: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'red',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: 'red',
        width: width,
        height: '92%',
        alignItems: 'center',
    },
    textBody: {
        backgroundColor: 'yellow',
        width: width,
        height: '8%',
    },
    cardView: {
        backgroundColor: 'orange',
        width: width * 0.90,
        height: '92%',
    },
    card: {
        backgroundColor: 'white',
        width: width * 0.40,
        height: height * 0.25,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        marginBottom: 20,
    },
    containerScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    profilPicture: {
        backgroundColor: 'blue',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    informationProfile: {
        alignSelf: 'flex-end',
    },
    informationPrenom: {
        color: 'white',
    },

})
