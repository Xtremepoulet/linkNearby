import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Signup = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password_is_valid, setPassword_is_valid] = useState(true);
    const [email_is_valid, setEmail_is_valid] = useState(true);

    const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/; 
    // Minimum eight characters, at least one letter, one number and one special character:
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; 
    

    const user_test = {
        password: 'YayaLe69!',
        email: 'yaya@gmail.com',
    }

    const user_signup = () => {
        if(!email_regex.test(email) || email === user_test.email){
            setEmail_is_valid(false);
        }
        if(password === user_test.password || !password_regex.test(password)){
            setPassword_is_valid(false);
        }
    }


    return(
            <LinearGradient colors={['#e8f4f7', '#e8f4f7']} style={styles.container}>
            {/* top section */}
                <View style={styles.top_container}>
                    <Text style={styles.app_title}>LINKNEARBY</Text>
                </View>

                {/* bottom section */}
                <View style={styles.bottom_container}>
                    <View style={styles.input_container}>
                    <LinearGradient colors={['#F98F22', '#FFA105']} style={styles.gradiant_input}>
                        <TextInput onChangeText={(value) => setEmail(value.toLocaleLowerCase())} style={styles.input} placeholder="Email..."></TextInput>
                    </LinearGradient>
                    {email_is_valid ? console.log('invalid email') : <Text style={styles.invalid_message}>INVALID EMAIL</Text>}
                    </View>
                    
                    <View style={styles.input_container}>
                        <LinearGradient colors={['#F98F22', '#FFA105']} style={styles.gradiant_input}>
                            <TextInput onChangeText={(value) => setPassword(value)} style={styles.input} placeholder="password..."></TextInput>
                        </LinearGradient>
                        {password_is_valid ? console.log('invalid password') : <Text style={styles.invalid_message}>INVALID PASSWORD</Text>}
                    </View>

                    <LinearGradient colors={['#F98F22', '#FFA105']} style={styles.gradiant_button}>
                    <TouchableOpacity style={styles.signup_button} onPress={() => user_signup()}>
                            <Text>Signup</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
    );
}


export default Signup;


const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      padding: 25,
    },

    input_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    invalid_message: {
        color: '#b91414',
    },

    gradiant_input: {
        width: '90%',
        borderRadius: 15,
    },

    input: {
        width: '100%',
        padding: 10,
        color: '#353439',
    },

    top_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        padding: 20,
    },

    app_title: {
        fontSize: 32,
    },

    bottom_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
    },

    signup_button: {
        width: '50%',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    gradiant_button: {
        width: '50%',
        borderRadius: 50,
    }

  });
  