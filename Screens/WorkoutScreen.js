/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";
import {dumDumExercise, dumDumRoutines} from "../DummyData/DummyParse";
import {Exercise} from "../Classes/Exercise";
import Dimensions from "react-native-web/src/exports/Dimensions";
import {WorkoutCard} from "./Components/WorkoutCard.js";

let exerciseWithin = dumDumRoutines[0].exercises; // Some temp bullshit

class WorkoutScreen extends React.Component {
  state ={
    exercises: [],
  }

  constructor(props) {
    super(props);
    this.fillArray();
  }

  // Fills the exercise array with exercise objects current just pulling form json object
  fillArray() {
    let tempExercise = [];
    for (let i = 0; i < exerciseWithin.length; i++) {
      let tempExer = dumDumExercise.find(temp => temp.exerciseID === exerciseWithin[i].exerciseID);
      console.log(tempExer.name);
      tempExercise.push(tempExer);
    }
    this.state.exercises = tempExercise;
  }

  getExerciseName(exerciseId) {
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx => {
      tx.executeSql("select name from exercises where Id = " + exerciseId + ";", [], (_, rows) => {

        console.log("sqllog_WorkoutScreen_exercises_name", rows.rows)

        return rows.rows;
      })
    })
  }

  getExerciseInfo(routine_Id) {
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx => {
      tx.executeSql("select numberOFReps, numberofSets, weight, placeInOrder, from ExercisesWithinRoutines where routineID = " + routine_Id + ";", [], (_, rows) => {

        console.log("sqllog_WorkoutScreen_exercises_info", rows.rows)

        return rows.rows;
      })
    })
  }

  //create method for removing exercise from exercise list
  removeExercise(exercise:Exercise){
    console.log("removeExercise-Pre-", this.state.exercises)
    const index = this.state.exercises.indexOf(exercise)
    if(index> -1){
      this.state.exercises.slice(index,1)
      console.log("removeExercise-Result-", this.state.exercises)
    }
  }

  finish(id, name, inputData){
    /*
    state = {
        id: '',
        name: '',
        isWeighted: false,
        isDone: false,
        textInput: [],
        inputData: [],
        count: 1
    }
     */
    let today = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay();
    let tempArray = this.state.exercises;
    let index = tempArray.indexOf(id);
    tempArray.splice(index, 1);
    this.state.exercises = tempArray;

  }

  render() {
    return (
        <View style={styles.workout}>
          <FlatList
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
              horizontal
              decelerationRate={0}
              snapToInterval={400}
              snapToAlignment={"center"}
              disableIntervalMomentum={ true }
              data={this.state.exercises} renderItem={({item}) => (
              <WorkoutCard
                  id={item.exerciseID}
                  name={item.name}
                  isWeight={item.doesUseWeight}
                  finishFunction={this.finish()}
              />

          )} keyExtractor={item => item.exerciseID}/>

        </View>
    )
  }
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
