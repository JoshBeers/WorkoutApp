/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";
import {dumDumExercise, dumDumRoutines} from "../DummyData/DummyParse";
import {Exercise, CompleteExercise, saveExerciseFromCompletedExercises} from "../Classes/Exercise";
import {CompletedWorkout, saveCompleteWorkout} from "../Classes/Workout";
import Dimensions from "react-native-web/src/exports/Dimensions";
import {WorkoutCard} from "./Components/WorkoutCard.js";

// let exerciseWithin = dumDumRoutines[0].exercises;

class WorkoutScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      routine: props.navigation.state.params.routine,
      today: (new Date().getFullYear() )+ '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()),
      userDone: false,
      completedExcer: [],
      comped:[],
    };
    console.log(props.navigation.state.params.routine)
  }

  componentDidMount() {
    console.log(this.state.routine.exercises);
  }

  // Takes finished exercise id, name, and input data, removes the the exercise from the array
  finish = (id, name, inputData) => {

    //makes average number of reps
    let averageReps = 0
    if(inputData.get(1).rep){
      for(let i = 1; i<inputData.size+1; i++){
        averageReps += parseInt(inputData.get(i).rep)
      }
      averageReps = averageReps / inputData.size
    }
    //averages weight
    let averageWeight = 0
    if(inputData.get(1).weight){
      for(let i = 1; i<inputData.size+1; i++){
        averageWeight += parseInt(inputData.get(i).weight)
      }
      averageWeight = averageWeight / inputData.size
    }

    this.state.comped.push(new CompleteExercise(0,id,0,averageReps,inputData.size,averageWeight))
    console.log(this.state.comped)


    console.log(id," ", name,"  ", inputData)
    let tempArray = this.state.routine.exercises;
    let index = 0;
    let tempExer;
    let numReps = 0;
    let weight = 0;
    let tempFinish = this.state.completedExcer;

    for(let i = 0; i < tempArray.length; i++){
      if(tempArray[i].exerciseID === id) {
        tempExer = tempArray[i];
        index = i;
      }
    }
    console.log(tempExer.name);
    tempArray.splice(index, 1);
    this.setState({
      exercise: tempArray});

    for(let i = 0; i < inputData.length; i++){
      if(inputData[i].rep)
        numReps = numReps + inputData[i].rep;
      else
        numReps = numReps + inputData[i].time;

      if(inputData[i].weight)
        weight = weight + inputData[i].weight;
    }

    /*
    let finExercise = new CompleteExercise(0, tempExer.exerciseID, 0, numReps, inputData[inputData.length - 1].set, (weight/(inputData[inputData.length - 1].set)), this.state.today);
    console.log(finExercise.exerciseId)
    console.log(this.state.exercises);

    tempFinish.push(finExercise);
 */

    if(this.state.routine.exercises.length === 0){


      /*
      let compl = new CompletedWorkout(0, this.state.today, tempFinish);
      saveCompleteWorkout(compl, (result) =>{
        console.log(result,"asdfasfsdfas d fsdrf ");
      });

       */


      this.setState({userDone: true})
    }



  }

  finishedButton(){
    console.log(this.state.today)
    saveCompleteWorkout(new CompletedWorkout(0,this.state.today,this.state.comped))
    this.props.navigation.navigate('home')
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
                  onPress={() => this.finishedButton()}
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
              data={this.state.routine.exercises} renderItem={({item}) => (
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
