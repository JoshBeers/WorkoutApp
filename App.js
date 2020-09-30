/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LoginScreen from './Screens/LoginScreen';
import {View} from 'react-native-web';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <View>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Log In" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

export default App;
