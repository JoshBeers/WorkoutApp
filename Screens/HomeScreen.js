import React from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import {Card} from 'react-native-elements';

export default class LoginScreen extends React.Component{
    signUp: Button;
    signIn: Button;
    render() {
        return(
            <View style={styles.home}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        background: '#1C2224',
        alignContent: 'center',
    },
    stepsCard: {
    },
    calendarCard: {
    },
    waterCard: {
    },
    caffeineCard: {
    },
    bottomMenu: {
    },
});
