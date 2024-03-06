import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Dimensions, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { defineBirthdate } from '../reducers/users';

const windowHeight = Dimensions.get('window').height;

export default function BirthdateScreen({ navigation }) {
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [birthdate, setBirthdate] = useState('');

    const showDatePicker = () => {
        setBirthdate('')
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        console.log(date)
        setBirthdate(date.getTime());

        hideDatePicker();
    };

    const handleNext = () => {
        const dateDuJourEnMs = new Date().getTime();
        console.log(dateDuJourEnMs - birthdate)
        console.log()




        /*
                if (birthdate) {
                    dispatch(defineBirthdate(birthdate));
                    navigation.navigate('PassionScreen');
                } else {
                    navigation.navigate('PassionScreen');
                }
                */
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={birthdate !== '' ? new Date(birthdate) : new Date()}
            />

            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.navigate('ChooseGenderScreen')}
                >
                    <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
                </Pressable>
                <Text style={styles.headerText}>Quel est ton âge ?</Text>
            </View>

            <View style={styles.bottom}>

                <Pressable
                    style={styles.button}
                    onPress={showDatePicker}
                >
                    <Text style={styles.texteblanc}>Sélectionner la date de naissance</Text>
                </Pressable>


                <Text>Date de naissance sélectionnée : {birthdate}</Text>


                <Pressable
                    style={[styles.button, { marginTop: 20 }]}
                    onPress={handleNext}
                >
                    <Text style={styles.texteblanc}>Suivant</Text>
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
        marginTop: windowHeight * 0.1,
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
