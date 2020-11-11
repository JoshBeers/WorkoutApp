/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import Colors from "../Themes/Colors";
import {Exercise, createNewExerciseFromExercise, getAllExercises} from "../Classes/Exercise";

export default class CreateNewExerciseScreen extends React.Component {

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

    finish(){
        let temp = new Exercise(0, this.state.exerciseName, this.state.exerciseDescription, this.state.isWeighed, this.state.isCardio);
        console.log(temp);
        createNewExerciseFromExercise(temp, function () {
            getAllExercises(function (result){
                console.log(result)
            })
        });
        this.setState({
            isDone: true,
        })

    }

    /*
    <Checkbox
                            disabled={false}
                            value={this.state.isWeighed}
                            onValueChange={(val) => this.setState({isWeighed: val})}
                            tintColors={this.state.isWeighted ? Colors.positive : Colors.negative}/>


    <Checkbox
                                disabled={false}
                                value={this.state.isCardio}
                                onValueChange={(val) => this.setState({isCardio: val})}
                                tintColors={this.state.isCardio ? Colors.positive : Colors.negative}
                                />


     */
    render(){
        return(
            <View style={styles.screen}>
                <Text style={styles.titleText}>Create A New Exercise</Text>
                <View >
                    <Card containerStyle={styles.card}>
                        <View style={styles.textField}>
                            <TextInput
                                placeholder="NAME"
                                onChangeText={(text) => this.setState({exerciseName: text})}
                            />
                        </View>
                        <View style={styles.lgTextField}>
                            <TextInput
                                placeholder="DESCRIPTION"
                                multiline={true}
                                onChangeText={(text) => this.setState({exerciseDescription: text})}
                            />
                        </View>
                        <View style={styles.checkRow}>



                        <Text style ={styles.checkLabel}>Does this use weights?</Text>
                        </View>
                        <View style={styles.checkRow}>

                            <Text style ={styles.checkLabel}>Is this cardio?</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                title='Finish'
                                color={Colors.btn}
                                onPress={() => this.finish()}
                                disabled={this.state.exerciseName.length === 0}>
                                <Text style={styles.buttonText}>FINISH</Text>
                            </Button>
                        </View>
                    </Card>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    titleText: {
        color: Colors.text,
        fontSize: 27,
        marginTop: 30,
    },
    screen: {
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: 'center',
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
    card: {
        marginTop: 20,
        width: 370,
        height: 450,
        backgroundColor: Colors.card,
        borderWidth: 0,
        alignSelf: 'center',
        alignItems: 'center',
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
    lgTextField: {
        alignSelf: 'center',
        backgroundColor: Colors.textFieldBackground,
        color: Colors.card,
        height: 200,
        width: 300,
        marginTop: 5,
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
    }
})

