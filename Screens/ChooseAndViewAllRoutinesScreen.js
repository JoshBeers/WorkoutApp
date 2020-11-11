/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite';
import Colors from '../Themes/Colors';
import {Card} from 'react-native-elements';
import {listStyle} from '../Themes/Styles';
import {getAllRoutinesWithOutExercises} from "../Classes/Routine";
import * as navigation from "react-navigation";
import ViewAndEditSingleRoutine from "./ViewAndEditSingleRoutine";
import NativeStackNavigator from "react-native-screens/src/native-stack/navigators/createNativeStackNavigator";

export default class ChooseAndViewAllRoutinesScreen extends React.Component {
  state = {
    routineList: [],
  }

  constructor() {
    super();
      console.log("test")
  }

  //method returns a list of routines
  //has not been tested
  componentDidMount() {
      console.log("test")
      getAllRoutinesWithOutExercises((result)=>{
          this.setState({
              routineList: result
          },function(){
              console.log(this.state.routineList)
          })
      });
  }

  render() {
      return (
        <View style={listStyle.screen}>
            <Text style={listStyle.titleText}>Saved Routines</Text>
          <FlatList
              data={this.state.routineList}
              renderItem={({item}) => (
                  <TouchableOpacity onPress= {() =>  this.props.navigation.navigate('SingleRoutineScreen',{
                      routineID: item.id,
                  })}>
                      <Card containerStyle={styles.card}>
                        <Text style={styles.text}>{item.name}</Text>
                      </Card>
                  </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: Colors.card,
        borderWidth: 0,
        alignSelf: 'center',
        width: 370,
        height: 75,
    },
    text: {
        color: Colors.text,
        fontSize: 20,
        marginTop: 10,
    }

})
