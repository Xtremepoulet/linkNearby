import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function MessageCard(props) {
    const picture = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsfGVufDB8fDB8fHww';

    const isConnected = true


    return (
        <View style={styles.card}>
            <View style={styles.nope}>
                <Image style={styles.image} source={require('../assets/profile.png')}></Image>
            </View>
            <View style={styles.msg}>
                <Text>Jerem Ptit Zbeub</Text>
                <Text style={styles.txtcolor} >last message... • il y a 2min</Text>
            </View>

        </View>
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
