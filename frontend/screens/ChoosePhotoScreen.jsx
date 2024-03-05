import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { defineName, defineUri } from '../reducers/users';
import { useState, useEffect, useRef } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';



export default function ChoosePhotoScreen({ navigation }) {
    const dispatch = useDispatch();

    const [hasPermission, setHasPermission] = useState(false);
    
    let cameraRef = useRef(null)

    //permission for camera 
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
     
      if (!hasPermission) {
        return <View></View>;
      }


      //take picture from the phone 
      const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
        console.log(photo);
      }


      //take document from gallery 
    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
             type: '*/*'// You can specify the file types you want to pick
          });
          //allowing only jgep files to be upload 
          if (result && result.assets[0].mimeType === 'image/jpeg') {
            console.log('Document picked:', result.assets[0].uri);
            dispatch(defineUri(result.assets[0].uri))
            // const formData = new FormData();
            // formData.append('photoFromFront', {
            //     uri: result.assets[0].uri,
            //     name: 'photo.jpg',
            //     type: 'image/jpeg',
            //    });     
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
            {/* header section */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('BiographyScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Parles nous de toi</Text>
            </View>



            <Camera style={styles.camera_container}>
                
            </Camera>

            <Text> --- or ---</Text>
            <Pressable
                    style={styles.button}
                    title="Go to PassionsScreen"
                    onPress={() => pickDocument()}
                >
                    <Text style={styles.texteblanc}>Add from</Text>
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
        justifyContent: 'space-between',
        backgroundColor: 'red',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
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
    },

    camera_container: {
        width: '90%',
        height: '60%',
        borderWidth: 1,
    }
    
});
