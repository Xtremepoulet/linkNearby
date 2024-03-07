import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window'); // Recupere la dimension de l'écran


export default function ConversationScreen({ navigation }) {
    return (

        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>
            <View style={styles.alignHeader} >
                <Pressable style={styles.paddingArrow}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Pressable style={styles.card}>

                    <View style={styles.nope}>
                        <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    </View>
                    <View style={styles.pseudo}>
                        <Text>Jeremy-marie</Text>
                    </View>

                </Pressable>
                <Text style={styles.passion} >🍄pilotage de cerf-volant</Text>

            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.oui}
                keyboardVerticalOffset={Platform.OS === "ios" ? height * -0.02 : height * -0.01}
            >
                <ScrollView style={styles.messages} >
                    <Text multiline={true} style={styles.msg}>bonjour je suis adrian et je suis un gros mangeur de taboulet</Text>

                </ScrollView>
                <TextInput style={styles.stretch} placeholder='caca' ></TextInput>
            </KeyboardAvoidingView >

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    oui: {
        flex: 1,
        width: '95%',
        height: '20%',


    },
    border: {
        borderRadius: 5,
        height: '85%',
        width: 300,
        backgroundColor: 'white'
    },
    stretch: {
        height: '6%',
        width: 300,
    },


    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    }
    , textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5
    },
    image: {
        height: 45,
        width: 45,
    },
    card: {
        flexDirection: 'row',
        marginTop: 5,
        borderRadius: 8,
        height: 55
    },
    pseudo: {
        flexDirection: "column",
        justifyContent: 'space-evenly',
        padding: 10
    },


    nope: {
        padding: 6
    },
    alignHeader: {
        flex: 0.09,

        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 2,


    },
    paddingArrow: {
        padding: 15
    },
    passion: {
        borderWidth: 1,
        borderRadius: 5,
        height: '25%',
        fontSize: 10
    },
    messages: {
        width: '90%',
        height: 0,
        backgroundColor: 'blue'
    },
    msg: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F98F22',
        color: 'white',
        padding: 5,
        maxWidth: '75%',
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    stretch: {
        height: '6%',
        width: 300,
        borderWidth: 1,

    },

})

