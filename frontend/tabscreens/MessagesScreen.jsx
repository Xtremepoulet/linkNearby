import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';

export default function MessagesScreen({ navigation }) {
    return (
        <SafeAreaView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>Discussions</Text>
            <View style={styles.stretch}>
                <TextInput style={styles.border} placeholder="Rechercher un utilisateur" ></TextInput>
            </View>
            <ScrollView style={styles.oui}>
                <Text>Discussions</Text>

                <View style={styles.card}>
                    <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    <View style={styles.msg}>
                        <Text >oui</Text>
                        <Text>dernier message</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    <View style={styles.msg}>
                        <Text >oui</Text>
                        <Text>dernier message</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Image style={styles.image} source={require('../assets/profile.png')}></Image>
                    <View style={styles.msg}>
                        <Text >oui</Text>
                        <Text>dernier message</Text>
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
        backgroundColor: 'lightblue'
    },
    oui: {
        flex: 1,
        width: '95%',
        height: '20%',
        backgroundColor: 'lightblue',


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
        backgroundColor: 'lightblue'
    },

    image: {
        height: 60,
        width: 60,
        marginLeft: 10
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 5,
        height: 80
    },
    msg: {
        marginLeft: 10

    }

})
