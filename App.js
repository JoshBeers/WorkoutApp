import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateRoutineScreen from './Screens/CreateRoutineScreen';
import WorkoutScreen from './Screens/WorkoutScreen';

import * as SQLite from 'expo-sqlite';
import * as firebase from 'firebase';
import ChooseWorkoutScreen from './Screens/ChooseWorkoutScreen';
import FitnessAnalyticsScreen from './Screens/FitnessAnalyticsScreen';
import {createDummyData, createTables} from './StartUpSQL';
import {runSQLTest} from "./test/SQLTesting";


var testing = true


export const db = SQLite.openDatabase("workoutAppDB.db");


var firebaseConfig = {
  apiKey: 'AIzaSyBuyPSc2O6-BZ7oj0AKGxm7pUdApKxAFUI',
  authDomain: 'ggc-fitness-app.firebaseapp.com',
  databaseURL: 'https://ggc-fitness-p.firebaseio.com',
  projectId: 'ggc-fitness-app',
  storageBucket: 'ggc-fitness-app.appspot.com',
  messagingSenderId: '83945559531',
  appId: '1:83945559531:web:1ee8110b78ef4ccf1c75ae',
  measurementId: 'G-0QPQF0ZNLJ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  Home: HomeScreen,
  // Workout: WorkoutScreen,
  // ChooseWorkout: ChooseWorkoutScreen,
  // FitnessAnalytics: FitnessAnalyticsScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

//startup sql

createTables(function(){
        if(testing){
            runSQLTest()
        }
});


