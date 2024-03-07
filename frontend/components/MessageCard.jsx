import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

function MessageCard(props) {
    const navigation = useNavigation()


    return (
        <Pressable onPress={() => navigation.navigate('ConversationScreen')} style={styles.card}>
            <View style={styles.nope}>
                <Image style={styles.image} source={require('../assets/profile.png')}></Image>
            </View>
            <View style={styles.msg}>
                <Text>Jerem Ptit Zbeub</Text>
                <Text style={styles.txtcolor} >last message... • il y a 2min</Text>
            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({
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
});
export default MessageCard;
