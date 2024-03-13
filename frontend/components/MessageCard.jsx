import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment.js';
const { width, height } = Dimensions.get('window');

function MessageCard(props) {
    const navigation = useNavigation()
    //va faloir load ca avec des props 


    const display_message_count = <View style={styles.messages_count_container}>
        <View style={styles.message_count_circle}>
            <Text style={styles.statusIndicator}>{props.messageCount}</Text>
        </View>
    </View>

    const calendarFormat = {
        lastDay: '[Hier à] HH:mm',  // Format pour hier
        sameDay: 'HH:mm',  // Format pour aujourd'hui
        nextDay: '[Demain à] HH:mm',  // Format pour demain
        lastWeek: '[le] dddd [à] HH:mm',  // Format pour la semaine dernière
        nextWeek: 'dddd [à] HH:mm',  // Format pour la semaine prochaine
        sameElse: 'DD/MM/YYYY [à] HH:mm'  // Format pour toutes les autres dates
    };

    return (
        <Pressable onPress={() => navigation.navigate('ConversationScreen', { userId: props.userId, name: props.name, uri: props.uri })} style={styles.card}>
            <View style={styles.nope}>
                <Image style={styles.image} source={{ uri: props.uri }}></Image>
            </View>
            <View style={styles.msg}>
                {props.messageCount > 0 ? display_message_count : ''}
                <Text style={styles.message_nameUser}>{props.name}</Text>
                <View style={styles.message_preview}>
                    <Text style={styles.txtcolor} numberOfLines={1} ellipsizeMode='tail' >{props.lastMessage.message}...</Text>
                    <Text>·</Text>
                    <Text style={styles.date}>{moment(props.lastMessage.CreatedAt).calendar(null, calendarFormat)}</Text>
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
        width: width * 0.60,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

    txtcolor: {
        color: '#a3a3a3',
        fontSize: 13,
        maxWidth: width * 0.43,
    },
    date: {
        color: '#00000040',
        fontSize: 11
    },
    messages_count_container: {
        width: '75%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    statusIndicator: {
        display: 'flex',
        textAlign: 'center',
        color: 'white',
    },
    message_count_circle: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: -17,
        right: width * -0.05,
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 50,
    },
    message_nameUser: {
        fontWeight: '600',
        fontSize: 17,
    },
});
export default MessageCard;
