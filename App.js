/* eslint-disable prettier/prettier */
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateRoutineScreen from './Screens/CreateRoutineScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import StatisticsScreen from './Screens/StatisticsScreen';
import ChooseAndViewAllRoutinesScreen from './Screens/ChooseAndViewAllRoutinesScreen';
import ViewAndEditSingleRoutine from './Screens/ViewAndEditSingleRoutine';
import CreateNewExerciseScreen from "./Screens/CreateNewExerciseScreen";

import * as SQLite from 'expo-sqlite';
import * as firebase from 'firebase';
import {createDummyData, createTables} from './StartUpSQL';
import {runSQLTest} from "./test/SQLTesting";

import ViewAndEditAllExercises from "./Screens/ViewAndEditAllExercises";

var testing = false;

export const db = SQLite.openDatabase('workoutAppDB.db');

createTables(function () {
    //createDummyData()
    if (testing) {
        runSQLTest();
    }
});

//Put Firebase config here
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// <<<<<<< HEAD
// const AppTabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={24} color={tintColor}/>
//       }
//     },
//     ViewRoutineScreen: {
//       screen: ChooseAndViewAllRoutinesScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => <Ionicons name="md-fitness" size={24} color={tintColor}/>
//       }
//     },
//       CreateNewExerciseScreen: {
//           screen: CreateNewExerciseScreen,
//           navigationOptions: {
//               tabBarIcon: ({tintColor}) => <Ionicons name="md-create" size={24} color={tintColor}/>
//           }
//       },
//       CreateRoutineScreen: {
//           screen: CreateRoutineScreen,
//           navigationOptions: {
//               tabBarIcon: ({tintColor}) => <Ionicons name="md-create" size={24} color={tintColor}/>
//           }
//       },
//     ExerciseScreen: {
//       screen: WorkoutScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => <Ionicons name="md-fitness" size={24} color={tintColor}/>
//       }
//     },
//     FitnessAnalyticsScreen: {
//       screen: StatisticsScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => <Ionicons name="md-stats" size={24} color={tintColor}/>
//       }
//     }
//   },
//   {
//       tabBarOptions: {
//         activeTintColor: "#161F3D",
//         inactiveTintColor: "#B8BBC4",
//         showLabel: true,
//       }
//
//   }
// );

// const AppStack = createStackNavigator({
//   Home: HomeScreen,
//    //Workout: WorkoutScreen,
//   // ChooseWorkout: ChooseWorkoutScreen,
//   // FitnessAnalytics: StatisticsScreen,
// });


const RootStack = createStackNavigator({
    home: HomeScreen,
    StatsScreen: StatisticsScreen,
    RoutinesScreen: ChooseAndViewAllRoutinesScreen,
    CreateExerciseScreen: CreateNewExerciseScreen,
    CreateRoutineScreen: CreateRoutineScreen,
    AllExercisesScreen: ViewAndEditAllExercises,
    SingleRoutineScreen: ViewAndEditSingleRoutine,
    WorkoutScreen: WorkoutScreen,
    },
    {
        header: null,
        headerMode: 'none'
    });

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: RootStack, //was AppStack before
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

//startup sql



