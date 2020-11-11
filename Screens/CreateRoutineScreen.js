import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, TouchableOpacity, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import {Routine} from "../Classes/Routine";
import * as SQLite from "expo-sqlite";
import {createNewExerciseFromExercise, Exercise, ExerciseWithinRoutine, getAllExercises} from "../Classes/Exercise";
import {dumDumExercise} from "../DummyData/DummyParse";
import Colors from "../Themes/Colors";
import {listStyle} from "../Themes/Styles";
import Checkbox from '@react-native-community/checkbox';

class CreateRoutineScreen extends Component {

    constructor() {
        super();
        this.state = {
            routineName: '',
            allExercises: [],
            selectedExercises: [],
            isDone: false,
        }
    }
    componentDidMount() {
        this.setState({
            allExercises: this.fillArray(),
        })

    }

    // Fills the exercise array with exercise objects current just pulling form json object
    fillArray() {
        let tempExercise = [];
        for (let i = 0; i < dumDumExercise.length; i++) {
            let tempExer = dumDumExercise[i];
            console.log(tempExer.name);
            tempExercise.push(tempExer);
        }
        return tempExercise;
    }

    toggleList(exercise, val){
        if(val)
            this.state.selectedExercises.push(exercise);
        else if (!val){
            let tempArray = this.state.selectedExercises;
            let index = 0;

            for(let i = 0; i < tempArray.length; i++){
                if(tempArray[i].exerciseID === exercise.exerciseID)
                    index = i;
            }

            console.log(index);
            tempArray.splice(index, 1);
            this.setState({
                selectedExercises: tempArray});
        }
        console.log(this.state.selectedExercises);
    }

    finish(){
        this.setState({
            isDone: true,
        })
    }

    modalClick(){
        this.setState({
            routineName: '',
            selectedExercises: [],
            isDone: false,
        })
    }

    render() {
        return (
            <View style={listStyle.screen}>
                <View>
                    <Modal
                        animationType={'slide'}
                        visible={this.state.isDone}
                        transparent={true}
                    >
                        <View style = {styles.modalStyle}>
                            <Text style={styles.modalText}>Nice!</Text>
                            <Image source={require('../img/muscles.png')}
                                   style={{
                                       width: '25%',
                                       height: '25%',
                                       margin: 50,
                                   }}/>
                            <Button
                                title="Return"
                                color={Colors.positive}
                                onPress={() => this.modalClick()}
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
                <Text style={listStyle.titleText}>Create Routine</Text>
                <View style={styles.textField}>
                    <TextInput
                        placeholder="NAME"
                        onChangeText={(text) => this.setState({routineName: text})}
                    />
                </View>
                <View style = {{height: 470}}>
                    <FlatList
                    data={this.state.allExercises}
                    extraData={this.state.checked}
                    renderItem={({item}) =>(
                            <Card containerStyle={styles.card}>
                                <View style={styles.checkRow}>
                                    <Checkbox
                                        disabled={false}
                                        value={this.state.checked}
                                        onValueChange={(val) => {
                                            this.toggleList(item, val);
                                            this.setState({checked: !this.state.checked})
                                        }}
                                        tintColors={Colors.positive}/>
                                        <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </Card>
                    )}
                    keyExtractor={item => item.exerciseID.toString()}
                />
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title='Finish'
                        color={Colors.btn}
                        onPress={() => this.finish()}
                        disabled={this.state.routineName.length === 0}>
                        <Text style={styles.buttonText}>FINISH</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Colors.card,
        borderWidth: 0,
        alignSelf: 'center',
        width: 370,
        height: 75,
    },
    text: {
        color: Colors.text,
        fontSize: 20,
        marginLeft: 10,
    },
    buttonView: {
        width: 100,
        marginTop: 20,
        alignSelf: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.text,
    },
    textField: {
        alignSelf: 'center',
        backgroundColor: Colors.textFieldBackground,
        color: Colors.card,
        height: 40,
        width: 300,
        marginTop: 20,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: Colors.card,
    },
    checkRow:{
        flexDirection: 'row',
        margin: 5
    },
    checkLabel: {
        color: Colors.text,
        marginTop: 7,
    },
    modalStyle: {
        alignSelf: 'center',
        backgroundColor: Colors.card,
        alignItems: 'center',
        marginTop: 100,
        height: 400,
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 40,
        color: Colors.text,
    },
})

module.exports = CreateRoutineScreen;


