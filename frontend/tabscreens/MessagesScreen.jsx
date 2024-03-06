import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function MessagesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

            <Text style={styles.textTitle}>Discussions</Text>
            <View style={styles.stretch}>
                <TextInput style={styles.border} placeholder="Rechercher un utilisateur" ></TextInput>
            </View>
            <ScrollView style={styles.oui}>
                <Text style={styles.textBody}>Messages</Text>

                <View style={styles.card}>
                    <View style={styles.nope}>
                        <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    </View>
                    <View style={styles.msg}>

                        <Text>Jerem Ptit Zbeub</Text>

                        <Text style={styles.txtcolor} >last message... • il y a 2min</Text>

                    </View>

                </View>





            </ScrollView>
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

    image: {
        height: 60,
        width: 60,
        padding: 20
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 8,
        height: 80
    },
    msg: {
        flexDirection: "column",
        justifyContent: 'space-evenly',
        padding: 10
    },


    nope: {
        padding: 6
    },
    txtcolor: {
        color: '#a3a3a3'
    }
    , textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    }
    , textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5
    }

})
