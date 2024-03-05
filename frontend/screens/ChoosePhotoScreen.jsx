import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineName } from '../reducers/users';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';


const windowHeight = Dimensions.get('window').height;

export default function ChoosePhotoScreen({ navigation }) {
    const dispatch = useDispatch();

    const [fileResponse, setFileResponse] = useState([]);

    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
             type: '*/*'// You can specify the file types you want to pick
          });
       
          if (result.assets[0].mimeType === 'image/jpeg') {
            console.log('Document picked:', result.assets[0].uri);
          } else {
            console.log('Document picking cancelled');
            // console.log(result.assets[0].mimeType)
          }
        } catch (error) {
          console.error('Error picking document:', error);
        }
      };




    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('BiographyScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Parles nous de toi</Text>
            </View>
            <Text>Picture handler</Text>

            <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => pickDocument()}
                >
                    <Text style={styles.texteblanc}>ADDING PIC</Text>
                </Pressable>
            <View style={styles.bottom}>

                <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => navigation.navigate('ActivateLocalisationScreen')}
                >
                    <Text style={styles.texteblanc}>Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    arrowIcon: {
        marginRight: 10,
        marginBottom: 2,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: windowHeight * 0.6, // Descend légèrement la vue bottom
    },
    input: {
        marginVertical: 12,
        borderBottomWidth: 1,
        width: '80%',
        fontSize: 18,
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: '80%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#F98F22',
        marginTop: 20,
    },
    texteblanc: {
        color: 'white'
    }
});
