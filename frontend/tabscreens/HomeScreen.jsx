import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/HomeCard';
import CardNew from '../components/HomeCardNew';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran
import { SafeAreaView } from 'react-native-safe-area-context'; // composant pour gérer les zones safe sur ios et android
import { ScrollView } from 'react-native';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;


export default function HomeScreen({ navigation }) {

    const token = useSelector((state) => state.users.value.token);
    const [users, setUsers] = useState([])

    const user_token = useSelector((state) => state.users.value.token);

    useEffect(() => {
        connected_user();
    }, []);
        

    const connected_user = async () => {
        const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/user_connected`, {
            method: 'GET',
            headers: { 'authorization': user_token },
        });
        const result = await fetching_data.json();        
    }

    

    const user_infos = { name: 'hello' }
    useEffect(() => {
        fetch(`${CONNECTION_BACKEND}/user/authorisation`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': token },
        })
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await fetch(`${CONNECTION_BACKEND}/user/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json();
        if (result.result) {
            setUsers(result.users)
        }
    }

    const usersList = users.map((user, index) => {
        const birthdate = new Date(user.birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        return <Card key={index} picture={user.uri} isConnected={user.isConnected} name={user.name} age={age} />;
    });



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? height * 0 : height * -0.01}
        >
            <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

                <View style={styles.header}>
                    <View style={styles.containerFiltre}>
                        <Pressable onPress={() => console.log('aie!')}>
                            <FontAwesome name="bars" size={24} style={styles.arrowIcon} />
                        </Pressable>
                    </View>
                    <View style={styles.logoMarque}>
                        <Image source={logoLinkNearby} style={styles.logo} />
                        <Text style={styles.headerText}>LINK NEARBY</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.containertextBody}>
                        <Text style={styles.textBody}>Linkers</Text>
                    </View>

                    <View style={styles.cardView}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerScroll}>
                            {/* {usersList} */}
                            <CardNew />
                            <Card />
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
        backgroundColor: 'white',
    },
    header: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        width: width,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 10,
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
        width: '20%',
        // backgroundColor: 'yellow',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoMarque: {
        flexDirection: 'row',
        width: '70%',
        // backgroundColor: 'red',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'start',
    },
    body: {
        // backgroundColor: 'red',
        width: width,
        height: '92%',
        alignItems: 'center',
    },
    containertextBody: {
        // backgroundColor: 'yellow',
        width: width,
        height: '5%',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    cardView: {
        // backgroundColor: 'orange',
        width: width * 0.90,
        height: '97%',
    },
    containerScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },


})
