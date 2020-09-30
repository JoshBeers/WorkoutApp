import React from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import {Card} from 'react-native-elements';

export default class LoginScreen extends React.Component{
    signUp: Button;
    signIn: Button;
    render() {
        return(
            <View style={styles.login}>
                <Card style = {styles.loginCard}>
                    <Card.Title>Let's get these gains!</Card.Title>
                    <TextInput>Username</TextInput>
                    <TextInput>Password</TextInput>
                    <View style = {styles.buttonView}>
                        <Button style = {styles.signUpButton} title={this.signUp} onPress={}>Sign Up</Button>
                        <Button style = {styles.signUpButton} title={this.signIn} onPress={}>Sign In</Button>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    login: {
        background: '#1C2224',
        alignContent: 'center',
    },
    loginCard: {
        position: 'absolute',
        width: 366,
        height: 30,
        background: '#404A4F',
        alignContent: 'center',
    },
    signUpButton: {
        background: '066da1',
        color: 'white',
        width: 148,
        height: 37.16,
    },
    signInButton: {
        background: '5189a5',
        color: 'white',
        width: 148,
        height: 37.16,
    },
    buttonView: {
        flexDirection: 'row',
    },
});

