import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

function MessageCard(props) {
    const navigation = useNavigation()
    //va faloir load ca avec des props 
    return (
        <Pressable onPress={() => navigation.navigate('ConversationScreen', { userId: props.userId, name: props.name, uri: props.uri })} style={styles.card}>
            <View style={styles.nope}>
                <Image style={styles.image} source={{ uri: props.uri }}></Image>
            </View>
            <View style={styles.msg}>
                <Text>{props.name}</Text>
                <Text style={styles.txtcolor} >{props.lastMessage.message}</Text>
               {/* {console.log(props.lastMessage)} */}
               
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        borderRadius: 50,
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
