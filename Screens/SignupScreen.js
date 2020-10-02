import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, Text, Button, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import PasswordValidator from "password-validator";

export default class SignupScreen extends Component{


    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: ""
    }

    passwordValidator = new PasswordValidator();


    constructor() {
        super();
        this.passwordValidator.is().min(8);
        this.passwordValidator.is().max(15);
        this.passwordValidator.has().lowercase(1);
        this.passwordValidator.has().uppercase(1);
        this.passwordValidator.has().digits(1);
        this.passwordValidator.has().not().spaces(1);
        this.passwordValidator.has().symbols(1);
    }

    handleSubmit = () =>{

        if(!validator.isEmail(this.state.email)){
            this.setState({
                errorMessage: 'Please enter correct email.'
            });
            return false;
        }

        if(!this.passwordValidator.validate(this.state.password)){
            let ref = this.passwordValidator.validate(this.state.password,{list:true});
            let message = '';
            if(ref.includes('min'))
                message = 'Password must be 8 or more characters';
            else if(ref.includes('max'))
                message = 'Password cannot be longer than 15 characters';
            else if(ref.includes('lowercase'))
                message = 'Password must contain a lowercase letter';
            else if(ref.includes('uppercase'))
                message = 'Password must contain a uppercase letter';
            else if(ref.includes('digits'))
                message = 'Password must contain a digit';
            else if(ref.includes('symbols'))
                message = 'Password must contain a symbol';
            else if(ref.includes('spaces'))
                message = 'Password must not contain a space';
            this.setState({
                errorMessage: message
            });
            return false
        }

        if(this.state.password!=this.state.confirmPassword){
            this.setState({
                errorMessage: 'Passwords must match'
            })
            return false;
        }

        this.setState({
            errorMessage: null
        })
        return true;
    }







    render() {
    return(
      <View style={styles.signup}>
            <Card containerStyle={styles.signupCard}>
                <Text style={styles.titleText}>Create a New Account</Text>
                <View style={styles.textField}>
                    <TextInput
                    placeholder= "USERNAME"
                    style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
                    onChangeText={text => this.state({username:text})}
                    />
                </View>
                <View style={styles.textField}>
                    <TextInput
                        placeholder= "EMAIL ADDRESS"
                        style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
                        onChangeText={text => this.state({email:text})}/>
                </View>
                <View style={styles.textField}>
                    <TextInput
                        placeholder= "PASSWORD"
                        style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
                        onChangeText={text => this.state({password:text})}
                    />
                </View>
                <View style={styles.textField}>
                    <TextInput
                        placeholder= "CONFIRM PASSWORD"
                        style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
                        onChangeText={text => this.state({confirmPassword:text})}
                    />
                </View>
                <View style={styles.finishButton}>
                    <Button style={styles.buttonText} color="#066da1" title="FINISH">
                    </Button>
                </View>
            </Card>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    signup: {
        backgroundColor: '#1C2224',
        flex: 1,
    },
    signupCard: {
        width: 366,
        height: 397,
        backgroundColor: '#404A4F',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 0,
        marginTop: 134,
    },
    finishButton: {
        width: 148,
        height: 35,
        margin: 51,
        alignSelf: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 27,
        alignSelf: 'center',
        margin: 15,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    textField: {
        alignSelf: 'center',
        backgroundColor: '#5b6970',
        color: '#404A4F',
        height: 40,
        width: 307,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: '#404A4F',
    }
});

module.exports = SignupScreen;
