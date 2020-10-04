import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';
import Colors from '../Themes/Colors';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  stepPercentage = 0.6; //Place holder variable
  stepCount = 2500; // Place holder variable
  today = moment().format('YYYY-MM-DD');

  state = {
    email: '',
    displayName: '',
  };
  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;

    this.setState({email, displayName});
  }
  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <View style={styles.home}>
        <View style={styles.test}>
          <Text style={{color: 'white'}}>Hi {this.state.email}!</Text>

          <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Card containerStyle={styles.stepsCard}>
          <ProgressCircle
            progress={this.stepPercentage}
            style={{
              height: 100,
            }}
            progressColor={Colors.btn}
            backgroundColor={Colors.background}
          />
          <Text style={styles.stepText}>{this.stepCount} STEPS</Text>
        </Card>
        <Card containerStyle={styles.calendarCard}>
          <CalendarStrip
            scrollable
            style={{
              height: 100,
              backgroundColor: Colors.card,
              paddingTop: 10,
            }}
            calendarColor={Colors.card}
            calendarHeaderStyle={{color: Colors.text}}
            dateNumberStyle={{color: Colors.text}}
            dateNameStyle={{color: Colors.text}}
          />
        </Card>
      </View>
    );
  }
}

const dummyDates = [];

const styles = StyleSheet.create({
  home: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  stepsCard: {
    marginTop: 50,
    width: 366,
    backgroundColor: Colors.card,
    borderWidth: 0,
    alignSelf: 'center',
  },
  calendarCard: {
    backgroundColor: Colors.card,
    borderWidth: 0,
    width: 366,
    alignSelf: 'center',
  },
  waterCard: {},
  caffeineCard: {},
  bottomMenu: {},
  stepText: {
    color: Colors.text,
    fontSize: 27,
    alignSelf: 'center',
    marginTop: 7,
  },
  test: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
