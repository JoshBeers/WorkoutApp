import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import {enableScreens} from 'react-native-screens';
import SignUpScreen from "./Screens/SignUpScreen";
import * as firebase from "firebase";


// run this before any screen render(usually in App.js)
// <Stack.Screen name="Log In" component={LoginScreen}/> add this shit back later...
enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="Home" component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
