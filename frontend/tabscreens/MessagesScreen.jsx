import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

export default function MessagesScreen({ navigation }) {
    return (
        <SafeAreaView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text>Discussions</Text>
            <View style={styles.oui}>
                <Text>Discussions</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    oui: {
        flex: 1,
        width: '100%',
        backgroundColor: 'pink'
    },
})
