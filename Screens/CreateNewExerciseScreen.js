/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, Text, View, Button, FlatList, Modal, Image} from 'react-native';
import {Card} from 'react-native-elements';
import Colors from "../Themes/Colors";
import {Exercise, createNewExerciseFromExercise, getAllExercises} from "../Classes/Exercise";
import CheckBox from 'react-native-check-box';

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
        this.setState({isDone: true});
    }

    render(){
        return(
            <View style={styles.screen}>
                <View>
                    <Modal
                        animationType={'slide'}
                        visible={this.state.isDone}
                        transparent={true}
                    >
                        <View style = {styles.modalStyle}>
                            <Text style={styles.modalText}>AWESOME!</Text>
                            <Image source={require('../img/trophy.png')}
                                   style={{
                                       width: 200,
                                       height: 150,
                                       margin: 50,
                                   }}/>
                            <Button
                                title="Return"
                                color={Colors.positive}
                                onPress={() => this.props.navigation.navigate('home')}
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
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={()=>{
                                    this.setState({
                                        isWeighed: !this.state.isWeighed,
                                    })
                                }}
                                isChecked={this.state.isWeighed}
                                rightText="Does this use weights?"
                                rightTextStyle={styles.text}
                                uncheckedCheckBoxColor={Colors.negative}
                                checkedCheckBoxColor={Colors.positive}
                            />
                        </View>
                        <View style={styles.checkRow}>
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={()=>{
                                    this.setState({
                                        isCardio: !this.state.isCardio,
                                    })
                                }}
                                isChecked={this.state.isCardio}
                                rightText="Is this cardio?"
                                rightTextStyle={styles.text}
                                uncheckedCheckBoxColor={Colors.negative}
                                checkedCheckBoxColor={Colors.positive}
                            />
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
    text: {
        color: Colors.text,
        fontSize: 15,
        marginLeft: 10,
    },
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
        margin: 0
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

