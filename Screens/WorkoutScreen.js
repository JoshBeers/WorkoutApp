/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";
import {dumDumExercise, dumDumRoutines} from "../DummyData/DummyParse";
import {Exercise} from "../Classes/Exercise";
import Dimensions from "react-native-web/src/exports/Dimensions";
import {WorkoutCard} from "./Components/WorkoutCard.js";

let exerciseWithin = dumDumRoutines[0].exercises; // Some temp bullshit

class WorkoutScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      exercises: [],
      today: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(),
      userDone: false,
    };
  }

  componentDidMount() {
    this.setState({
      exercises: this.fillArray(),
    })
  }

  // Fills the exercise array with exercise objects current just pulling form json object
  fillArray() {
    let tempExercise = [];
    for (let i = 0; i < exerciseWithin.length; i++) {
      let tempExer = dumDumExercise.find(temp => temp.exerciseID === exerciseWithin[i].exerciseID);
      console.log(tempExer.name);
      tempExercise.push(tempExer);
    }
    return tempExercise;
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

  // Takes finished exercise id, name, and input data, removes the the exercise from the array
  finish = (id, name, inputData) => {
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
    let tempArray = this.state.exercises;
    let index = 0;

    for(let i = 0; i < tempArray.length; i++){
      if(tempArray[i].exerciseID === id)
        index = i;
    }

    console.log(index);
    tempArray.splice(index, 1);
    this.setState({
      exercise: tempArray});

    console.log(this.state.exercises);
    if(this.state.exercises.length === 0)
      this.setState({userDone: true})
  }

  render() {

    return (
        <View style={styles.workout}>
          <View>
            <Modal
              animationType={'slide'}
              visible={this.state.userDone}
              transparent={true}
              >
              <View style = {styles.modalStyle}>
                <Text style={styles.modalText}>GREAT WORK!</Text>
                <Image source={require('../img/finish.png')}
                  style={{
                    width: 200,
                    height: 150,
                    margin: 50,
                  }}/>
                <Button
                  title="Return"
                  color={Colors.positive}
                  onPress={console.log("IVE BEEN CLICKED!")}
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 40,
                  }}>
                  <Text style={styles.buttonText}>RETURN</Text>
                </Button>
              </View>
            </Modal>
          </View>
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
                  isCardio={item.isCardio}
                  finishFunction={this.finish}
              />

          )} keyExtractor={(item) => item.exerciseID.toString()}/>
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
  modalStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.card,
    alignItems: 'center',
    marginTop: 100,
    height: 400,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.text,
    alignSelf: 'center'
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 40,
    color: Colors.text,
  },
  card: {
    marginTop: 150,
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
