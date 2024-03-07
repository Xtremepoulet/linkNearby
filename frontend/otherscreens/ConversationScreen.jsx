import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function ConversationScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container} edges={['top']} styleAndroid={{ flex: 1 }}>

            <Text style={styles.textTitle}>messages <FontAwesome name="comment" size={24} />
            </Text>

            <ScrollView style={styles.oui}>
                <Text style={styles.textBody}>Messages</Text>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

})

