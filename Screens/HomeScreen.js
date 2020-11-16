/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, Button
} from 'react-native';
import {Card} from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';
import Colors from '../Themes/Colors';
import * as firebase from 'firebase';
import {CompletedWorkout, getAllCompleteWorkoutsWithoutExercises} from "../Classes/Workout";
import StatisticsScreen from "./StatisticsScreen";
import createBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {


  constructor() {
    super();
    this.steps = 0
    this.state = {
      marked: null,
      email: '',
      displayName: '',
      dates: []
    };
    this.getDates((result)=>{
      this.setState({
        dates : result,
        marked: result
      })
      //
    })

    console.log("dataLog_HomeScreen_AfterGettingDates sfaisdyfasdfh dk dl adsl jldsj fl kslkd;f j",this.state)
  }
  today = moment().format('YYYY-MM-DD');

  componentDidMount() {
    this.getDates((result)=>{
      this.setState({
        dates : result,
        marked: result
      })
      //
    })
    firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get().then((doc) =>{
      //alert(doc.data())
      this.setState({
        email: doc.data().Email,
        displayName: doc.data().Username
      })
    });



  }


  signOutUser = () => {
    firebase.auth().signOut();
  };




  getDates(callback){

    getAllCompleteWorkoutsWithoutExercises(function (result:CompletedWorkout[]) {
      let temp = new Object();


      for(let i = 0; i<result.length; i++){
        const date = result[i].date.toString()
        temp[date] = {selected:true}
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
            <Text style={styles.stepText}>
              WELCOME {this.state.displayName}!
            </Text>
            <View style={{marginTop: 10}}>
              <Button
                title="LogOut"
                color={Colors.negative}
                onPress={() => this.signOutUser()}>
                <Text>SIGN OUT</Text>
              </Button>
            </View>
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
            {/* <button onClick={()=> this.props.navigation.navigate('StatsScreen')}>Stats</button>
            <button onClick={()=> this.props.navigation.navigate('CreateRoutineScreen')}>Create Routine</button>
            <button onClick={()=> this.props.navigation.navigate('CreateExerciseScreen')}>Create Exercise</button>
            <button onClick={()=> this.props.navigation.navigate('RoutinesScreen')}>Workout Routines</button> */}
          </Card>
          <Card containerStyle = {styles.navCard}>
          <View style={styles.container}>
          <Ionicons name="md-stats" size={40} color={'#066da1'} onPress={()=> this.props.navigation.navigate('StatsScreen')}/>
          <Ionicons name="md-paper" size={40} color={'#066da1'} onPress={()=> this.props.navigation.navigate('CreateRoutineScreen')}/>
          <Ionicons name="md-create" size={40} color={'#066da1'} onPress={()=> this.props.navigation.navigate('CreateExerciseScreen')}/>
          <Ionicons name="md-fitness" size={40} color={'#066da1'} onPress={()=> this.props.navigation.navigate('RoutinesScreen')}/>
          </View>
          <View style={styles.containerText}>
            <Text>Statistics</Text>
            <Text>Create Routine</Text>
            <Text>Create Exercise</Text>
            <Text>Workout</Text>
          </View>
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
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 7,
  },
  navCard: {
    backgroundColor: Colors.card,
    borderWidth: 0,
    width: '100%',
    alignSelf: 'center',
    //alignItems: 'center',
    marginTop: 120,
  },
  container: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 20,
  },
  containerText: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    //paddingLeft: 2,
    paddingRight: 10,
  },
  topButtonContainer: {
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    width: 350,
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  bottomButtonContainer: {
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    width: 350,
   justifyContent: 'space-around',
   paddingTop:10,
  },
  mainButton: {
    height: '100%',
    width: '40%',
    borderRadius: 10,
   //backgroundColor: '#066da1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
  },
});
