import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import {Card} from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import validator from 'validator';
import PasswordValidator from "password-validator";

 class SignUpScreen extends Component {
  signUp: Button;
  signIn: Button;
  state = {email: 'a@a.com', password: 'aA1!aaaaa' ,passwordConfirm: 'aA1!aaaaa', errorMessage: null};
  passwordValidator = new PasswordValidator();

  constructor() {
      super();
      this.passwordValidator.is().min(8);
      this.passwordValidator.is().max(15);
      this.passwordValidator.has().lowercase(1);
      this.passwordValidator.has().uppercase(1);
      this.passwordValidator.has().digits(1);
      this.passwordValidator.has().not().spaces();
      this.passwordValidator.has().symbols(1);
  }

  handleSignUpButton =async () => {
      if(this.updateErrorMessage()){
          try{
              let responce = await auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
              if(responce) {
                  console.log("tag",responce);
              }
          } catch (e){
              this.setState({
                  errorMessage : e
              });
          }
      }
  }


  updateErrorMessage = () => {
      //validates email
      if(!validator.isEmail(this.state.email)){
          this.setState({
              errorMessage: "Please Enter Proper Email"
          })
          return false;
      }


      //validates password
      if(!this.passwordValidator.validate(this.state.password)) {
          const res = this.passwordValidator.validate(this.state.password, {list: true});
          var message = '';

          if (res.includes('min')) {
              message = 'Password must be atleast 8 characters long'
          } else if (res.includes('max')) {
              message = 'Password cannot be longer than 15 characters'
          } else if (res.includes('lowercase')) {
              message = 'Password must contain one lowercase letter'
          } else if (res.includes('uppercase')) {
              message = 'Password must contain one uppercase letter'
          } else if (res.includes('digits')) {
              message = 'Password must contain one digit'
          } else if (res.includes('symbols')) {
              message = 'Password must contain one symbol'
          }


          this.setState({
              errorMessage: message
          })
          return false;
      }


      if(this.state.passwordConfirm != this.state.password){
          this.setState({
              errorMessage: "Make sure Confirmation matches password"
          })
          return false;
      }



      this.setState({
          errorMessage: null
      })
      return true;
  }




  render() {
    return (
        <View style={{marginLeft: 3, marginRight: 3, marginTop: 2}}>
          <Text style={{marginLeft: 20, marginRight: 3, marginTop: 50}}> Email:</Text>
          <TextInput
              style={{marginLeft: 20, marginRight: 3, marginTop: 2}}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(email) => {this.setState({email});
                this.updateErrorMessage();
            }}
            value={this.state.email}
          ></TextInput>

          <Text style={{marginLeft: 20, marginRight: 3, marginTop: 50}}> Password:</Text>
          <TextInput

            style={{marginLeft: 20, marginRight: 3, marginTop: 2}}
            placeholder="Password"
            onChangeText={(password) => {this.setState({password});
            }}
            value={this.state.password}
          ></TextInput>

            <Text style={{marginLeft: 20, marginRight: 3, marginTop: 50}}>Confirm Password:</Text>
            <TextInput
                secureTextEntry
                style={{marginLeft: 20, marginRight: 3, marginTop: 2}}
                placeholder="Confirm Password"
                onChangeText={(passwordConfirm) =>{ this.setState({passwordConfirm});
                }}
                value={this.state.passwordConfirm}
            ></TextInput>



            <Button
            title={'Sign Up'}
            onPress={this.handleSignUpButton}
            >
            </Button>

            <Text>{this.state.errorMessage}</Text>
    </View>
    );
  }
}



module.exports = SignUpScreen;
