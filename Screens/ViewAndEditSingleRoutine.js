/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import { listStyle } from '../Themes/Styles';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-elements';
import {Abs, Arm, Back, Chest, Rear} from '../img/WorkoutIcons';
import {getAllRoutinesWithOutExercises, getSpecificRoutine, Routine} from '../Classes/Routine';
import Colors from "../Themes/Colors";
import {getAllExercisesWithinRoutines} from "../Classes/Exercise";


export default class ViewAndEditSingleRoutine extends Component {


    constructor(props) {
        super(props);
        this.state = {
            routine: new Routine(props.navigation.state.params.routineID)
        }
        console.log("single routine screen ", props.navigation.state.params.routineID)

    }

    //no idea if this works
    componentDidMount() {
        console.log("single routine screen ", this.state.routine.id)
        getSpecificRoutine(this.state.routine.id, (result)=>{
            console.log("single routine screen ", result)
            this.setState({
                routine : result
            },function () {




                console.log("single routine screen ", this.state)
            })
        })
    }

    render() {
        return (
            <View style={listStyle.screen}>
                <View style={listStyle.container}>
                    <Text style={styles.text}>{this.state.routine.name}</Text>
                </View>
                <FlatList
                    data={this.state.routine.exercises}
                    renderItem={({item}) => (
                        <Card containerStyle={styles.card}>
                            <Text style={styles.text}>{item.name}</Text>
                        </Card>

                    )}
                    keyExtractor={item => item.id}
                />
                <View style={styles.button}>
                    <Button
                        color={Colors.positive}
                        onPress={()=> {
                        this.props.navigation.navigate('WorkoutScreen',{
                        routine: this.state.routine
                        });}}
                            title='Workout'>
                        <Text>WORKOUT</Text>
                    </Button>
                </View>
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
    },
    button: {
        margin: 40,
    }
})
