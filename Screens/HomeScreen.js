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
import * as SQLite from 'expo-sqlite';

export default class HomeScreen extends React.Component {
  stepPercentage = 0.6; //Place holder variable
  stepCount = 2500; // Place holder variable
  today = moment().format('YYYY-MM-DD');

  state = {
    email: '',
    displayName: '',
    dates: []
  };
  componentDidMount() {

    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then((doc) =>{
      //alert(doc.data())
      this.setState({
        email: doc.data().Email,
        displayName: doc.data().Username
      })

    });

    this.setState({
      dates: this.getDates()
    })
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };


  getDates(){

    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select date from Workouts;",[],(_,rows) =>{

        let temp = [];
        console.log("sqllog", rows.rows)
        console.log("sqllogg", rows.rows.length)


        for(i = 0; i<rows.rows.length; i++){
          temp.push(rows.rows._array[i].date)
          //console.log("sqlloggg",rows.rows._array[i])
        }

        console.log("sqllog", temp)

        return rows;
      })
    })
  }

  render() {
    return (
      <View style={styles.home}>
        <View style={styles.test}>
          <Text style={{color: 'white'}}>Hi {this.state.displayName}!</Text>

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
