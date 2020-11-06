/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";

import {dumDumExercise, dumDumRoutines} from "../DummyData/DummyParse";

let exercises = [];
let exerciseWithin = dumDumRoutines[0].exercises; // Some temp bullshit

class WorkoutScreen extends React.Component {

  constructor(props) {
    super(props);
    this.fillArray();
  }

  // Fills the exercise array with exercise objects current just pulling form json object
  fillArray() {
    for(let i = 0; i < exerciseWithin.length; i++){
      let tempExer = dumDumExercise.find(temp => temp.exerciseID === exerciseWithin[i].exerciseID);
      console.log(tempExer.name);
      exercises.push(tempExer);
    }
  }

  // Gets id to know which input lines to create, also currently pulling from JSON. Ill change it later
  // Apparently i need to use states. *cries*
  createInputLine(excerID){
    let anothertemp = exercises.find(id => id.exerciseID === excerID);
    if(anothertemp.doesUseWeight === true){
      return(
          <View>
            <View style={styles.textField}>
              <TextInput
                placeholder="SET"
              />
            </View>
            <View style={styles.textField}>
              <TextInput
                placeholder="REP"
              />
            </View>
            <View style={styles.textField}>
              <TextInput
                placeholder="WEIGHT"
              />
            </View>
          </View>
      );
    }
    else{
      return(
          <View style={styles.textField}>
            <TextInput
                placeholder="SET"
            />
          </View>
      );
    }
  }

  getExerciseName(exerciseId){
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select name from exercises where Id = " + exerciseId + ";",[],(_,rows) =>{

        console.log("sqllog_WorkoutScreen_exercises_name", rows.rows)

        return rows.rows;
      })
    })
  }

  getExerciseInfo(routine_Id) {
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select numberOFReps, numberofSets, weight, placeInOrder, from ExercisesWithinRoutines where routineID = " + routine_Id + ";",[],(_,rows) =>{

        console.log("sqllog_WorkoutScreen_exercises_info", rows.rows)

        return rows.rows;
      })
    })
  }

  render() {
    return(
    <View style = {styles.workout}>
      <FlatList
          horizontal
          data={exercises} renderItem={({item}) =>(
          <Card containerStyle = {styles.card}>
            <Text style = {styles.titleText}>{item.name}</Text>
          </Card>
        )}/>
    </View>
    )}
}

const styles = StyleSheet.create({
  workout: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: 'center',
  },
  card: {
    marginTop: 10,
    width: 370,
    height: 550,
    backgroundColor: Colors.card,
    borderWidth: 0,
    alignSelf: 'center',
  },
  titleText: {
    color: Colors.text,
    fontSize: 27,
    alignSelf: 'center',
    margin: 15,
  },
  textField: {
    alignSelf: 'center',
    backgroundColor: Colors.textFieldBackground,
    color: Colors.card,
    height: 40,
    width: 75,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: Colors.card,
  },
});

module.exports = WorkoutScreen;
