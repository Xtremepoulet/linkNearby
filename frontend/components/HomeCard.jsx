import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

function Card(props) {

    const navigation = useNavigation();

    let passions = ''
    if (props.passions) {
        passions = props.passions.slice(0, 1).map((passion) => {
            return (
                <View key={passion.id} style={styles.passionBody}>
                    <Text style={styles.passionText}>{passion.name} {passion.emoji}</Text>
                </View>
            );
        })
    }
    const handleProfileClick = () => {

        navigation.navigate('ProfilScreen', {
            userEmail: props.email,
            name: props.name,
            birthdate: props.age,
            location: props.location,
            bio: props.bio,
            gender: props.gender,
            passions: props.passions,
            picture: props.picture,
            isConnected: props.isConnected,
            userId: props.userId,
        });
    }

    return (
        <View>
            <View style={styles.card}>
                <Pressable onPress={handleProfileClick}>
                    <View style={styles.pictureContainer}>
                        <Image source={{ uri: props.picture }} style={styles.picture} />

                        {/* Dégradé en bas pour les informations */}
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            colors={['rgba(0,0,0,0.8)', 'transparent']}
                            style={styles.gradientBottom}
                        />

                        {props.isConnected && <View style={styles.statusIndicator}></View>}
                    </View>

                    <View style={styles.informationProfile}>
                        <Text style={styles.informationPrenom}>{props.name}, {props.age}</Text>
                        <Text style={styles.informationLocalisation}>
                            <View style={styles.arrowIcon}>
                                <FontAwesome name="location-arrow" size={16} style={styles.arrowIcon} />
                            </View>
                            à {props.distance}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.passionContainer}>
                {passions}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.40,
        height: height * 0.25,
        // marginBottom: 20,
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
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    informationLocalisation: {
        color: 'white',
        fontSize: 14,
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
    pictureContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    gradientBottom: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '20%',
    },

    passionText: {
        color: 'white',
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,

    },
    passionBody: {
        backgroundColor: '#F98F22',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    passionContainer: {
        marginBottom: 20,
        marginTop: 3,
    },
    arrowIcon: {
        color: 'white',
    },

});
export default Card;
