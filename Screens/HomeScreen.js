import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';
import Colors from '../Themes/Colors';
import * as firebase from 'firebase';
import {getAllCompleteWorkoutsWithoutExercises} from "../Classes/Workout";
import StatisticsScreen from "./StatisticsScreen";
import createBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";



export default class HomeScreen extends React.Component {


  constructor() {
    super();
    this.steps = 0
    this.state = { marked: null,
      email: '',
      displayName: '',
      dates: []
    };


  }
  stepPercentage = 0.6; //Place holder variable
  stepCount = 2500; // Place holder variable
  today = moment().format('YYYY-MM-DD');

  componentDidMount() {
    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then((doc) =>{
      //alert(doc.data())
      this.setState({
        email: doc.data().Email,
        displayName: doc.data().Username
      })

    });

    this.getDates((result)=>{
      this.setState({
        dates : result
      })
      //console.log("dataLog_HomeScreen_AfterGettingDates",this.state)
    })

  }


  signOutUser = () => {
    firebase.auth().signOut();
  };
/*
  markDates = () => {
    let aDate = this.getDates().reduce((a, b) => Object.assign(a, {[b]: {selected: true, dotColor: Colors.positive}}), {});
    this.setState({marked : aDate});
  }

 */

  getDates(callback){

    getAllCompleteWorkoutsWithoutExercises(function (result) {
      let temp = [];


      for(let i = 0; i<result.length; i++){
        temp.push(result[i].date)
        console.log("sqllog_HomeScreen_getDates",result[i])
      }
      console.log("sqllog_HomeScreen_getDates",temp)
      callback(temp)
      return temp;
    })

  }

  render() {
    return(
        <View style={styles.home}>
          <Card containerStyle={styles.stepsCard}>
            <ProgressCircle
                progress={this.stepPercentage}
                style={{
                  height: 100,
                }}
                progressColor={Colors.btn}
                backgroundColor={Colors.background}/>
            <Text style={styles.stepText}>
              {this.stepCount} STEPS
            </Text>
          </Card>
          <Card containerStyle = {styles.calendarCard}>
            <Calendar
                current = {this.today}
                style = {{width: 364,}}
                theme={{
                  backgroundColor: Colors.card,
                  calendarBackground: Colors.card,
                  arrowColor: Colors.negative,
                  dayTextColor: Colors.text,
                  monthTextColor: Colors.text,
                }}
                enableSwipeMonths={true}
                markedDates={this.state.marked}
            />
            <button onClick={()=> this.props.navigation.navigate('StatsScreen')}></button>
          </Card>
        </View>

    )
  }
}

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
    alignItems: 'center',
  },
  bottomMenu: {
  },
  stepText: {
    color: Colors.text,
    fontSize: 27,
    alignSelf: 'center',
    marginTop: 7,
  },
});
