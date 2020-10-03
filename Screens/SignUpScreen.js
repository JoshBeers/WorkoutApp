import React, {Component} from 'react';
import {Card} from 'react-native-elements';
import {View, Text, Button, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import Colors from '../Themes/Colors';
import PasswordValidator from 'password-validator';
import validator from 'validator/es';
import * as firebase from 'firebase';
import {firestore} from 'firebase';

export default class SignUpScreen extends Component {
  state = {
    username: 'bbbb',
    email: 'b@b.com',
    password: 'bB2@bbbb',
    confirmPassword: 'bB2@bbbb',
    errorMessage: '',
  };

  passwordValidator = new PasswordValidator();
  userNameValidator = new PasswordValidator();

  constructor() {
    super();
    this.passwordValidator.is().min(8);
    this.passwordValidator.is().max(15);
    this.passwordValidator.has().lowercase(1);
    this.passwordValidator.has().uppercase(1);
    this.passwordValidator.has().digits(1);
    this.passwordValidator.has().not().spaces(1);
    this.passwordValidator.has().symbols(1);

    this.userNameValidator.is().max(15);
    this.userNameValidator.is().min(4);
    this.userNameValidator.has().not().spaces();
  }

    state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""

    }
  validateFields = () => {
    if (!this.userNameValidator.validate(this.state.username)) {
      let ref = this.userNameValidator.validate(this.state.username, {
        list: true,
      });
      var message = '';
      if (ref.includes('max'))
        message = 'Username must be less than 15 characters';
      else if (ref.includes('min'))
        message = 'Username must be more than 4 characters';
      else if (ref.includes('spaces'))
        message = 'Username must not have spaces';
      this.setState({
        errorMessage: message,
      });
      return false;
    }

    if (!validator.isEmail(this.state.email)) {
      this.setState({
        errorMessage: 'Please enter correct email.',
      });
      return false;
    }

    if (!this.passwordValidator.validate(this.state.password)) {
      let ref = this.passwordValidator.validate(this.state.password, {
        list: true,
      });
      let message = '';
      if (ref.includes('min'))
        message = 'Password must be 8 or more characters';
      else if (ref.includes('max'))
        message = 'Password cannot be longer than 15 characters';
      else if (ref.includes('lowercase'))
        message = 'Password must contain a lowercase letter';
      else if (ref.includes('uppercase'))
        message = 'Password must contain a uppercase letter';
      else if (ref.includes('digits'))
        message = 'Password must contain a digit';
      else if (ref.includes('symbols'))
        message = 'Password must contain a symbol';
      else if (ref.includes('spaces'))
        message = 'Password must not contain a space';
      this.setState({
        errorMessage: message,
      });
      return false;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: 'Passwords must match',
      });
      return false;
    }

    this.setState({
      errorMessage: null,
    });
    return true;
  };

  handleOnClick = () => {
    if (this.validateFields()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          firestore()
            .collection('Users')
            .doc(user.user.uid)
            .set({
              uid: user.user.uid,
              username: this.state.username,
              email: this.state.email,
            })
            .catch((error) => alert(error));
        })
        .catch((error) => alert(error));
    }
  };

  render() {
    return (
      <View style={styles.signup}>
        <Card containerStyle={styles.signupCard}>
          <Text style={styles.titleText}>Create a New Account</Text>
          <View style={styles.textField}>
            <TextInput
              placeholder="USERNAME"
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}
            />
          </View>
          <View style={styles.textField}>
            <TextInput
              placeholder="EMAIL ADDRESS"
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
            />
          </View>
          <View style={styles.textField}>
            <TextInput
              placeholder="PASSWORD"
              secureTextEntry={true}
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
            />
          </View>
          <View style={styles.textField}>
            <TextInput
              secureTextEntry={true}
              placeholder="CONFIRM PASSWORD"
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              value={this.state.confirmPassword}
            />
          </View>

          {
            //new thing
          }
          <Text>{this.state.errorMessage}</Text>

          <View style={styles.finishButton}>
            <Button
              style={styles.buttonText}
              color="#066da1"
              title="FINISH"
              onPress={this.handleOnClick}></Button>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  signupCard: {
    width: 366,
    height: 397,
    backgroundColor: Colors.card,
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
    color: Colors.text,
    fontSize: 27,
    alignSelf: 'center',
    margin: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.text,
  },
  textField: {
    alignSelf: 'center',
    backgroundColor: Colors.textFieldBackground,
    color: Colors.card,
    height: 40,
    width: 307,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: Colors.card,
  },
});

module.exports = SignUpScreen;
