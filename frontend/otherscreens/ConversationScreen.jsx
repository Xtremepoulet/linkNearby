import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



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
                    <View style={styles.msg}>
                        <Text>Jerem Ptit Zbeub</Text>
                    </View>
                </Pressable>
            </View>



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
        padding: 20
    },
    card: {
        flexDirection: 'row',
        marginTop: 5,
        borderRadius: 8,
        height: 55
    },
    msg: {
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
        borderBottomWidth: 2,


    },
    paddingArrow: {
        padding: 20
    }

})

