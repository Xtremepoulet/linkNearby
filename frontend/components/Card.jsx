import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function Card(props) {
    const picture = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsfGVufDB8fDB8fHww';




    return (
        <View style={styles.card}>
            <Pressable onPress={() => console.log("oui")}>
                <Image source={{ uri: props.picture }} style={styles.picture} />
                {props.isConnected && <View style={styles.statusIndicator}></View>}
                <View style={styles.informationProfile}>
                    <Text style={styles.informationPrenom}>{props.name}</Text>
                    <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.40,
        height: height * 0.25,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        // Propriétés de l'ombre pour iOS
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2, // Opacité de l'ombre
        shadowRadius: 7, // Flou de l'ombre
        // Propriété de l'ombre pour Android
        elevation: 5, // Hauteur de l'élément par rapport à sa surface, produisant une ombre
    },
    picture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    informationProfile: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    informationPrenom: {
        color: 'white',
    },
    informationLocalisation: {
        color: 'white',
    },
    statusIndicator: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#91cb3e',
    },
});
export default Card;
