import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';

class LoginScreen extends Component {
  signUp: Button;
  signIn: Button;
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.login}>
        <Card containerStyle={styles.loginCard}>
          <Text style={styles.titleText}>Let's get these gains!</Text>
          <View style={styles.textField}>
            <TextInput
              placeholder="USERNAME"
              autoCapitalize="none"
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={styles.textField}>
            <TextInput
              secureTextEntry
              placeholder="PASSWORD"
              style={{marginLeft: 3, marginRight: 3, marginTop: 2}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <View style={styles.buttonView}>
            <View style={styles.signInButton}>
              <Button
                color="#066da1"
                title="Sign In"
                onPress={this.handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </View>
            <View style={styles.signUpButton}>
              <Button color="#5189a5" title="Sign Up">
                <Text style={styles.buttonText}>Sign Up</Text>
              </Button>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#1C2224',
    flex: 1,
  },
  loginCard: {
    width: 366,
    height: 305,
    backgroundColor: '#404A4F',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    marginTop: 134,
  },
  signUpButton: {
    width: 148,
    height: 35,
    marginRight: 11,
  },
  signInButton: {
    width: 148,
    height: 35,
    marginLeft: 11,
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 30,
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
  },
});

module.exports = LoginScreen;
