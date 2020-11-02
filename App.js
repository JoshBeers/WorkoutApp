/* eslint-disable prettier/prettier */
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";


import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateRoutineScreen from './Screens/CreateRoutineScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import ChooseWorkoutScreen from './Screens/ChooseWorkoutScreen';
import FitnessAnalyticsScreen from './Screens/FitnessAnalyticsScreen';
import ExerciseScreen from './Screens/ExerciseScreen';
import SavedRoutinesScreen from './Screens/SavedRoutinesScreen';
import ViewRoutineScreen from './Screens/ViewRoutineScreen';


import * as SQLite from 'expo-sqlite';
import * as firebase from 'firebase';
import {createDummyData, createTables} from './StartUpSQL';
import {runSQLTest} from "./test/SQLTesting";

import { NavigationContainer } from "@react-navigation/native";

// import { UserProvider } from "./context/UserContext";
// import { FirebaseProvider } from "./context/FirebaseContext";

// import AppStackScreens from "./stacks/AppStackScreens";

// export default App = () => {
//     return (
//         <FirebaseProvider>
//             <UserProvider>
//                 <NavigationContainer>
//                     <AppStackScreens />
//                 </NavigationContainer>
//             </UserProvider>
//         </FirebaseProvider>
//     );
// };

var testing = false;

export const db = SQLite.openDatabase('workoutAppDB.db');

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

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={24} color={tintColor}/>
      }
    },
    ViewRoutineScreen: {
      screen: ViewRoutineScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-fitness" size={24} color={tintColor}/>
      }
    },
    ExerciseScreen: {
      screen: ExerciseScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-fitness" size={24} color={tintColor}/>
      }
    },
    FitnessAnalyticsScreen: {
      screen: FitnessAnalyticsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-stats" size={24} color={tintColor}/>
      }
    }
  },
  {
      tabBarOptions: {
        activeTintColor: "#161F3D",
        inactiveTintColor: "#B8BBC4",
        showLabel: true,
      }

  }
);

// const AppStack = createStackNavigator({
//   Home: HomeScreen,
//    //Workout: WorkoutScreen,
//   // ChooseWorkout: ChooseWorkoutScreen,
//   // FitnessAnalytics: FitnessAnalyticsScreen,
// });


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator, //was AppStack before
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

//startup sql

createTables(function () {
  if (testing) {
    runSQLTest();
  }
});
