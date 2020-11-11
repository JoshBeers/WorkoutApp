/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";
import Colors from "../Themes/Colors";
import {Exercise, createNewExerciseFromExercise} from "../Classes/Exercise";
class CreateNewExersciseScreen extends React.Component {

    constructor(){
        super()
        this.state={
            exerciseName: '',
            exerciseDescription: '',
            isWeighed: false,
            isCardio: false,
            isDone: false,
        }
    }

    finished(){
        let temp = new Exercise(0, this.state.exerciseName, this.state.exerciseDescription, this.state.isWeighed, this.state.isCardio);
        createNewExerciseFromExercise(temp);
        this.setState({
            isDone: true,
        })
    }

    render(){
        return(
            <View>
                <View>
                    <Card>
                        <TextInput></TextInput>
                        <TextInput></TextInput>
                        <Button> </Button>

                    </Card>
                </View>
            </View>
        )
    }
}


