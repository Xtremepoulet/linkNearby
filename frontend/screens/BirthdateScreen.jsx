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
    const [birthdatea, setBirthdatea] = useState('');
    const [isBirthdateSelected, setIsBirthdateSelected] = useState(false);


    const showDatePicker = () => {
        setBirthdate('')
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);

        console.log("A date has been picked: ", date.toISOString());

        setBirthdate(date.getTime());
        setBirthdatea(date.toLocaleDateString());
        hideDatePicker();
        setIsBirthdateSelected(true);
    };

    const handleNext = () => {
        let oui = 0
        const dateDuJourEnMs = new Date().getTime();
        difference = dateDuJourEnMs - birthdate
        oui = difference / (1000 * 60 * 60 * 24 * 365.25)

        if (oui >= 18 && oui <= 120 && birthdate) {
            dispatch(defineBirthdate(birthdate));

            navigation.navigate('PassionScreen');
        } else {

        }
    };


    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 18);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={birthdate !== '' ? new Date(birthdate) : defaultDate}
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
                    {isBirthdateSelected ? <Text style={styles.texteblanc}>{birthdatea}</Text> : <Text style={styles.texteblanc}>Sélectionner la date de naissance</Text>}
                </Pressable>

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
        justifyContent: 'space-between',
        paddingTop: 40,
        backgroundColor: 'white',
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
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 50,
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
