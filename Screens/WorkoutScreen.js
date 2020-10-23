/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";

class WorkoutScreen extends Component {

  
  getExerciseName(exerciseId){
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select name from exercises where Id = exerciseId;",[],(_,rows) =>{

        console.log("sqllog_WorkoutScreen_exercises_name", rows.rows)

        return rows.rows;
      })
    })

  }

  getExerciseInfo(routine_Id) {
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select numberOFReps, numberofSets, weight, placeInOrder, from ExercisesWithinRoutines where routineID = routine_Id;",[],(_,rows) =>{

        console.log("sqllog_WorkoutScreen_exercises_name", rows.rows)

        return rows.rows;
      })
    })
  }

  render() {}
}

const styles = StyleSheet.create({});

module.exports = WorkoutScreen;
