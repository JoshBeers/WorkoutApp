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
import ChooseWorkoutScreen from './Screens which are not in doc/ChooseWorkoutScreen';
import StatisticsScreen from './Screens/StatisticsScreen';
import ExerciseScreen from './Screens/ViewAndEditAllExercises';
import ChooseAndViewAllRoutinesScreen from './Screens/ChooseAndViewAllRoutinesScreen';
import ViewAndEditSingleRoutine from './Screens/ViewAndEditSingleRoutine';
import CreateNewExerciseScreen from "./Screens/CreateNewExerciseScreen";

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

var testing = true;



export const db = SQLite.openDatabase('workoutAppDB.db');

createTables(function () {
    createDummyData()
    if (testing) {
        runSQLTest();
    }
});

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

const RootStack = createStackNavigator({
    home: HomeScreen,
    StatsScreen: StatisticsScreen
})

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



