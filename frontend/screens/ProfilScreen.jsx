import { View, Text, Pressable, Image, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/HomeCard';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran

export default function ProfilScreen({ route, navigation }) {




    const { userEmail, name, birthdate, location, bio, gender, passions, picture, isConnected } = route.params;

    const passionsUser = passions.map((passion) => {
        return (
            <View key={passion.id} style={styles.passionBody}>
                <Text style={styles.passionText}>{passion.name} {passion.emoji}</Text>
            </View>
        );
    })





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
                        <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerScroll}>
                            <View style={styles.topView}>
                                {/* <Card /> */}
                                <Card
                                    picture={picture}
                                    // isConnected={isConnected}
                                    // name={name}
                                    // age={birthdate}
                                    // passions={passions}
                                    email={userEmail}
                                />
                                <View style={styles.profilView}>
                                    <Text style={styles.informationPrenom}>{name} ,{birthdate} ans</Text>
                                    <Text>a 500 m</Text>
                                </View>
                            </View>

                            <Text style={styles.bioTextTitre}>Biographie</Text>
                            <View style={styles.bioView}>
                                <Text multiline={true} style={styles.bioText}>{bio}</Text>
                            </View>

                            <Text style={styles.passionsTextTitre}>Passions</Text>
                            <View style={styles.passionsView}>
                                {passionsUser}
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
        // backgroundColor: 'green',
    },
    header: {
        // backgroundColor: 'yellow',
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
        // backgroundColor: 'red',
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
        // backgroundColor: 'orange',
        width: width * 0.90,
        height: '97%',
    },
    containerScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'flex-start',
    },
    topView: {
        // backgroundColor: 'blue',
        width: '100%',
        height: 240,
        marginTop: 20,
        flexDirection: 'row',
        // alignItems: 'top',
    },
    profilView: {
        // backgroundColor: 'white',
        marginLeft: 20,
        marginTop: 20,
    },
    informationPrenom: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    informationLocalisation: {
        color: 'white',
        fontSize: 14,
    },
    bioView: {
        // backgroundColor: 'white',
        width: '100%',
        height: 200,
        marginTop: 20,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F98F22',
    },
    passionsView: {
        // backgroundColor: 'white',
        width: '100%',
        height: 200,
        marginTop: 20,

        borderRadius: 10,

        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    passionBody: {
        backgroundColor: '#F98F22',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 2,
    },
    passionText: {
        // color: 'white',
        fontSize: 13,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    bioTextTitre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        // backgroundColor: 'white',
    },
    passionsTextTitre: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        // backgroundColor: 'white',
    },
    bioText: {
        fontSize: 14,
        paddingHorizontal: 10,
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
    },

})