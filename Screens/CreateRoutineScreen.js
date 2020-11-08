import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {Routine} from "../Classes/Routine";
import * as SQLite from "expo-sqlite";
import {ExerciseWithinRoutine} from "../Classes/Exercise";

class CreateRoutineScreen extends Component {

    constructor() {
        super();
        this.state = {

        }
    }




    render() {
        return (
            <View style={styles.container}>
                <Text>CreateRoutineScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

module.exports = CreateRoutineScreen;


