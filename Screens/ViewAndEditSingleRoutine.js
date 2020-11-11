/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import { listStyle } from '../Themes/Styles';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-elements';
import {Abs, Arm, Back, Chest, Rear} from '../img/WorkoutIcons';
import {getAllRoutinesWithOutExercises, getSpecificRoutine, Routine} from '../Classes/Routine';

export default class ViewAndEditSingleRoutine extends Component {


    constructor(props) {
        super(props);
        this.state = {
            routineName: '',
            routineId: props.navigation.state.params.routineID,
            exerciseWithin: [],
        }
        console.log("single routine screen ", this.state.routineId)
    }

    //no idea if this works
    componentDidMount() {
        console.log("single routine screen ", this.state.routineId)
        getSpecificRoutine(this.state.routineId, (result)=>{
            this.setState({
                routineName: result.name,
                exerciseWithin: result.exercises,
            },function () {
                console.log("single routine screen ", this.state)
            })
        })
    }

    getExerciseName(exerciseId){
        const db = SQLite.openDatabase('workoutAppDB.db');

        db.transaction(tx =>{
          tx.executeSql('select name from exercises where Id = ' + exerciseId + ';',[],(_,rows) =>{

            console.log('sqllog_ViewRoutineScreen_exercises_name', rows.rows);

            return rows.rows;
          });
        });

      }

      getExerciseInfo(routine_Id) {
        const db = SQLite.openDatabase('workoutAppDB.db');

        db.transaction(tx =>{
          tx.executeSql('select numberOFReps, numberofSets, weight, placeInOrder, from ExercisesWithinRoutines where routineID = ' + routine_Id + ';',[],(_,rows) =>{

            console.log('sqllog_ViewRoutineScreen_exercises_info', rows.rows);

            return rows.rows;
          });
        });
      }

    render() {
        return (
            <View style={listStyle.screen}>
                <View style={listStyle.container}>
                    <Text style={listStyle.titleText}>Routine Name</Text>
                </View>
                <Text>{this.state.routineName}</Text>
                <FlatList
                    data={this.state.exerciseWithin}
                    renderItem={({item}) => (
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    )}
                    keyExtractor={item => item.id}
                />

            </View>
        );
    }
}
