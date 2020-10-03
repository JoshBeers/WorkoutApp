import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from "./Screens/SignUpScreen";
import WorkoutScreen from "./Screens/WorkoutScreen";
import {enableScreens} from 'react-native-screens';
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBuyPSc2O6-BZ7oj0AKGxm7pUdApKxAFUI",
    authDomain: "ggc-fitness-app.firebaseapp.com",
    databaseURL: "https://ggc-fitness-app.firebaseio.com",
    projectId: "ggc-fitness-app",
    storageBucket: "ggc-fitness-app.appspot.com",
    messagingSenderId: "83945559531",
    appId: "1:83945559531:web:1ee8110b78ef4ccf1c75ae",
    measurementId: "G-0QPQF0ZNLJ"
};

firebase.initializeApp(firebaseConfig);


// run this before any screen render(usually in App.js)
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false }}>
          <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Workout" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


let GlobalState = {

}
