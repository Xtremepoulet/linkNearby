import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function CardNew(props) {
    const picture = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsfGVufDB8fDB8fHww';

    const isConnected = true
    {/* {props.isConnected && <View style={styles.statusIndicator}></View>} */ }
    {/* <Text style={styles.informationPrenom}>Jérémy, 32ans</Text>
                    <Text style={styles.informationLocalisation}>Localisé à 500m</Text> */}

    //     <View key={index} onPress={() => handleSetPassion(passion._id)} style={styles.passionBody}>
    //     <Text style={styles.passionTexte}>Tennis 💪</Text>
    // </View>


    return (
        <View style={styles.card}>
            <Pressable onPress={() => console.log("oui")}>
                <View style={styles.pictureContainer}>
                    <Image source={{ uri: picture }} style={styles.picture} />

                    {/* Ajouter une passion dans la photo, en bas à droite */}
                    <View style={styles.passionContainer}>
                        <Text style={styles.passionText}>Tennis 💪</Text>
                    </View>
                </View>

                <View style={styles.informationProfile}>
                    {/* Ajouter un point indiquant l'état de connexion à gauche du prénom */}
                    <View style={styles.connectionStatusContainer}>
                        <View style={isConnected ? styles.statusIndicatorConnected : styles.statusIndicatorDisconnected}></View>
                        <Text style={styles.informationPrenom}>Jérémy, 32 ans</Text>
                    </View>
                    <Text style={styles.informationLocalisation}>Localisé à 500m</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.40,
        // Ajustement de la hauteur pour inclure la photo et les informations
        height: (width * 0.40) + 60, // Hauteur de la photo (carré) + espace pour les informations
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden', // Garde les bords arrondis intacts
    },
    pictureContainer: {
        width: '100%',
        height: width * 0.40, // Hauteur égale à la largeur pour former un carré
        borderRadius: 10, // Bords arrondis
        overflow: 'hidden', // Assure que l'image ne dépasse pas les bords arrondis
    },

    picture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Assure que la photo couvre l'espace sans être déformée
    },
    informationProfile: {

        paddingHorizontal: 5,
        paddingVertical: 10,

    },
    informationPrenom: {
        // Styles pour le prénom
        color: 'black', // Changement de la couleur pour une meilleure lisibilité

    },
    informationLocalisation: {
        // Styles pour la localisation
        color: 'black', // Changement de la couleur pour une meilleure lisibilité
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
    passionContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fond légèrement transparent pour la visibilité
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
    passionText: {
        color: 'black',
        fontSize: 12, // Ajustez selon la taille souhaitée
    },
    connectionStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicatorConnected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#91cb3e', // Vert pour indiquer l'état connecté
        marginRight: 5,
    },
    statusIndicatorDisconnected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'grey', // Gris pour indiquer l'état non connecté
        marginRight: 5,
    },
});
export default CardNew;
