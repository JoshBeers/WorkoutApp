/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import { listStyle } from '../Themes/Styles';
import * as SQLite from 'expo-sqlite';
import {Abs, Arm, Back, Chest, Rear} from '../img/WorkoutIcons';
import {getAllRoutinesWithOutExercises, getSpecificRoutine, Routine} from '../Classes/Routine';

export default class ViewAndEditSingleRoutine extends Component {

    //no idea if this works
    constructor(props) {
        super(props);
        this.routineId = props.navigation.state.params.routineId;
        this.state ={
            routine: null
        }
    }

    //no idea if this works
    componentDidMount() {
        getSpecificRoutine(this.routineId, (result)=>{
            this.setState({
                routine:result
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
        const allRoutineData = [
            {
                id: '1',
                title: 'workout name 1',
                icon: <Abs />,
            },
            {
                id: '2',
                title: 'workout name 2',
                icon: <Chest />,
            },
            {
                id: '3',
                title: 'workout name 3',
                icon: <Arm />,
            },
            {
                id: '4',
                title: 'workout name 4',
                icon: <Chest />,
            },
            {
                id: '5',
                title: 'workout name 5',
                icon: <Abs />,
            },
        ];

        const Item = ({title}) => (
            <View style={listStyle.item}>
                <Text style={listStyle.titleText}>{title}</Text>
            </View>
        );

        const renderItem = ({item}) => {
            return (
                // <Item title={item.icon} />
                <Item title={item.title}/>
            );
        };

        return (
            <View style={listStyle.screen}>
                <View style={listStyle.container}>
                    <Text style={listStyle.titleText}>Routine Name</Text>
                </View>
                <FlatList
                    data={allRoutineData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>
        );
    }
}
