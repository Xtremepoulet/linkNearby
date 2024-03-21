import React from 'react';
import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { defineUri } from '../reducers/users';
import { useState, useEffect, useRef } from 'react';

import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

const CONNECTION_BACKEND = Constants.expoConfig?.extra?.CONNECTION_BACKEND;



export default function ChoosePhotoScreen({ navigation }) {
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(false);

  const [rotation, setrotation] = useState(Camera.Constants.Type.front);
  const [flash, setflash] = useState(Camera.Constants.FlashMode.off);

  const [isPhoto_taken, setIsPhoto_taken] = useState(false);

  const uri = useSelector((state) => state.users.value.uri)
  const user_token = useSelector((state) => state.users.value.token)

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
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
    dispatch(defineUri(photo.uri));
    setIsPhoto_taken(true);
  }

  const change_rotation = () => {
    if (rotation === Camera.Constants.Type.back) {
      setrotation(Camera.Constants.Type.front);
    } else {
      setrotation(Camera.Constants.Type.back);
    }
  }



  const set_flash = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setflash(Camera.Constants.FlashMode.torch)
    } else {
      setflash(Camera.Constants.FlashMode.off)
    }
  }


  const pickDocument = async () => {
    // Demander la permission d'accéder à la galerie de photos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Vous avez refusé l'accès à la galerie de photos.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Spécifie que seules les images sont sélectionnables
        allowsEditing: true, // Permet à l'utilisateur d'éditer l'image avant de la sélectionner
        aspect: [4, 3], // Aspect ratio pour l'éditeur
        quality: 1, // Qualité de l'image sélectionnée
      });
      if (!result.canceled) {
        dispatch(defineUri(result.assets[0].uri));
        setIsPhoto_taken(true);
      } else {
        console.log('Image picking cancelled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };


  //take document from gallery 
  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: '*/*'// You can specify the file types you want to pick
  //     });
  //     if (result && result.assets[0].mimeType === 'image/jpeg') {
  //       console.log('Document picked:', result.assets[0].uri);
  //       dispatch(defineUri(result.assets[0].uri))
  //       setIsPhoto_taken(true)
  //     } else {
  //       console.log('Document picking cancelled');
  //       // console.log(result.assets[0].mimeType)
  //     }
  //   } catch (error) {
  //     console.error('Error picking document:', error);
  //   }
  // };


  const go_to_navigation_screen = async () => {
    if (isPhoto_taken) {

      const formData = new FormData();
      formData.append('photoFromFront', {
        uri: uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const fetching_data = await fetch(`${CONNECTION_BACKEND}/user/upload_user_photo`, {
        method: 'POST',
        headers: { 'authorization': user_token },
        body: formData,
      });


      const result = await fetching_data.json();

      navigation.navigate('ActivateLocalisationScreen')

    }
  }


  //definititon des elements qui seront display par la suite selon si la photo est prise ou non 
  const image = <View style={styles.camera_container}>
    <Image
      style={styles.camera}
      source={{
        uri: uri,
      }}
    />

    <FontAwesome onPress={() => setIsPhoto_taken(false)} name='rotate-right' size={25} color='#F98F22' />

  </View>


  const camera = <View style={styles.camera_container}>
    <View style={styles.camera_container_top}>
      <Camera style={styles.camera} flashMode={flash} type={rotation} ref={cameraRef}>
        <View style={styles.camera_top_container}>
          <FontAwesome onPress={() => change_rotation()} name='rotate-right' size={25} color='#d6d3d2' />
          <FontAwesome onPress={() => set_flash()} name='flash' size={25} color='#d6d3d2' />
        </View>

        <View style={styles.camera_bottom_container}>
          <FontAwesome onPress={() => takePicture()} name='circle-thin' size={80} color='#d6d3d2' />
        </View>
      </Camera>
    </View>
    <View style={styles.camera_container_bottom}>
      <Pressable
        style={styles.from_button}
        title="Go to PassionsScreen"
        onPress={() => pickDocument()}
      >
        <Text style={styles.texteblanc}>Depuis la gallerie</Text>
      </Pressable>
    </View>
  </View>


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
        <Text style={styles.headerText}>Prend une belle photo</Text>
      </View>

      {isPhoto_taken ? image : camera}

      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          title="Go to PassionsScreen"
          onPress={() => go_to_navigation_screen()}
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
    paddingTop: 40,
    backgroundColor: 'white',
    gap: 20,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  arrowIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#F98F22',
  },

  from_button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '40%',
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#e8967d',
    marginTop: 20,
  },

  texteblanc: {
    color: 'white'
  },

  camera_container: {
    width: '95%',
    height: '70%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
  },

  camera: {
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  //pour le button dans la camera
  camera_bottom_container: {
    alignSelf: 'center',
  },

  //pour le button dans la camera 
  camera_top_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },

  camera_container_top: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera_container_middle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera_container_bottom: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }


});
