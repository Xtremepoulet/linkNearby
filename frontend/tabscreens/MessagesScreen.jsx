import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageCard from '../components/MessageCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function MessagesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

            <Text style={styles.textTitle}>Discussions <FontAwesome name="comment" size={24} />
            </Text>

            <View style={styles.stretch}>
                <TextInput style={styles.border} placeholder="Rechercher un utilisateur" ></TextInput>
            </View>
            <ScrollView style={styles.oui}>
                <Text style={styles.textBody}>Messages</Text>
                <MessageCard></MessageCard>
                <MessageCard></MessageCard>
                <MessageCard></MessageCard>
                <MessageCard></MessageCard>
                <MessageCard></MessageCard>
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


    textBody: {
        fontSize: 25,
        fontWeight: 'bold',
    }
    , textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5
    }

})
