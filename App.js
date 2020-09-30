import { StatusBar } from 'expo-status-bar';
import React from 'react';
<<<<<<< HEAD
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LoginScreen from './Screens/LoginScreen';
import {View} from 'react-native-web';

const Stack = createNativeStackNavigator();
=======
import { StyleSheet, Text, View } from 'react-native';
>>>>>>> da8d68aaf58773fc9df2a3fc1d02155f8c9a6015

export default function App() {
  return (
<<<<<<< HEAD
      <View>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Log In" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
=======
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> da8d68aaf58773fc9df2a3fc1d02155f8c9a6015
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
