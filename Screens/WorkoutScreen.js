/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";
import {Exercise} from "../Classes/Exercise";
import {dumDumExercise} from "../DummyData/DummyParse";

let exercises = [];

class WorkoutScreen extends Component {
  state = {
    exercisesWithin: []
  }

  constructor(props) {
    super(props);
    this.state.exercisesWithin = props.list;
  }

  componentDidMount() {
    for(let i = 0; i < this.state.exercisesWithin.length; i++){
      exercises.push(dumDumExercise.get(this.state.exercisesWithin[i].exerciseID));
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
          <Card style = {styles.card}
            title = {item.name}>
          </Card>
        )}/>
    </View>
    )}
}

const styles = StyleSheet.create({
  workout: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  card: {
    marginTop: 50,
    width: 366,
    backgroundColor: Colors.card,
    borderWidth: 0,
    alignSelf: 'center',
  },
});

module.exports = WorkoutScreen;
