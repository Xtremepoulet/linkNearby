import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment.js';
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
                <View style={styles.message_preview}>
                    <Text style={styles.txtcolor} >{props.lastMessage.message.substring(0, 20)}...</Text>
                    <Text> - </Text>
                    <Text style={styles.date}>{moment(props.lastMessage.CreatedAt).fromNow()}</Text>
                </View>
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
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 8,
        height: 80
    },
    msg: {
        flexDirection: "column",
        justifyContent: 'space-evenly',
        padding: 10,
        width: '100%',
    },
    nope: {
        padding: 6
    },
    message_preview: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },

    txtcolor: {
        color: '#a3a3a3',
    },

    date: {
        color: '#00000040',
    },
});
export default MessageCard;
