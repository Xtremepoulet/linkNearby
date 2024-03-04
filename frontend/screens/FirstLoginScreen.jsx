import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import logoLinkNearby from '../assets/linkNearbyBackNone.webp';

export default function FirstLoginScreen({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={logoLinkNearby} style={styles.logo} />
                <Text style={styles.h1}>LINK NEARBY</Text>
            </View>
            <View style={styles.body}>
                <Pressable
                    style={styles.button}
                    title="Go to SecondLoginScreen"
                    onPress={() => navigation.navigate('signupScreen')}
                >
                    <Text style={styles.text}>Créer un compte</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    title="Go to signin screen"
                    onPress={() => navigation.navigate('signinScreen')}
                >
                    <Text style={styles.text}>Connexion</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 70,
        // backgroundColor: 'blue',
        height: '10%',
        width: '100%',
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    img: {
        width: '100%',
        height: '50%'

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    input: {
        margin: 12,
        borderBottomWidth: 1,
        width: '80%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '80%',
        height: 70,
        margin: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFA53F',
    },
    body: {
        alignItems: 'center',
        height: '30%',
    }

})
