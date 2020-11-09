import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import Colors from "../../Themes/Colors";

export class WorkoutCard extends Component{
    state = {
        id: '',
        name: '',
        isWeighted: false,
        isDone: false,
        textInput: [],
        inputData: [],
        count: 1
    }

    constructor(props){
        super(props);
        this.state.id = props.id;
        this.state.name = props.name;
        this.state.isWeighted = props.isWeight.toString();
    }

    updateCount(val){
        this.setState({
            count: this.state.count + val
        })
    }

    addInput = () => {
        let textInput = this.state.textInput;
        // let inputData = this.state.inputData;
        let rep = 0;
        let weight = 0;
        let setInfo = [];
        if (this.state.isWeighted === true) {
            textInput.push(
                <View stype = {styles.textLine}>
                    <View style={styles.textField}>
                        <Text>{this.state.count}</Text>
                    </View>
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="REP"
                            onChangeText={(text) => rep = text}
                            keyboardType={"number-pad"}
                        />
                    </View>
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="WEIGHT"
                            onChangeText={(text) => weight = text}
                            keyboardType={"number-pad"}
                        />
                    </View>
                </View>
            );
            setInfo.push({'set': this.state.count, 'rep': rep, 'weight': weight});
        } else {
            textInput.push(
                <View style={styles.textField}>
                    <Text>{this.state.count}</Text>
                </View>
            );
            setInfo.push({'set': this.state.count});
        }
        this.updateCount(1);
        this.setState({textInput});
        this.addToArray(setInfo, this.state.count);
    }

    addToArray = (input, count) => {
        let array = this.state.inputData;
        let isThere = false;

        if(array !== 0){
            array.forEach(aSet => {
                if(aSet.set === count){
                    if(aSet.containsKey('rep')){
                        aSet.rep = input.rep;
                        aSet.weight = input.weight;
                    }
                    else {
                        aSet.set = set;
                    }
                    isThere = true
                }
            });
        }
        if(isThere){
            this.setState({
                inputData: array
            });
        }
        else {
            array.push(input);
            this.setState({
                inputData: array
            });
        }
    }

    removeInput = () => {
        let textInput = this.state.textInput;
        let inputData = this.state.inputData;

        textInput.pop();
        inputData.pop();
        this.updateCount(- 1);

        this.setState({textInput, inputData});
    }

    finish(){
        this.state.isDone = true;
        return(this.state);
    }

    render(){
        return(
            <View>
                <Card containerStyle={styles.card}>
                    <Text style = {styles.titleText}>{this.state.name}</Text>
                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            {this.state.textInput.map((value) => {
                                return value
                            })}
                        </ScrollView>
                    <View style={styles.buttonView}>
                        <View style={{margin: 5}}>
                            <Button
                                title = '-'
                                color={Colors.negative}
                                onPress={() => this.removeInput()}>
                                <Text style={styles.buttonText}>-</Text>
                            </Button>
                        </View>
                        <View style={{margin: 5}}>
                            <Button
                                title = 'Finish'
                                color = {Colors.btn}
                                onPress={() => this.finish()}>
                                <Text style={styles.buttonText}>FINISH</Text>
                            </Button>
                        </View>
                        <View style={{margin: 5}}>
                            <Button
                                title = '+'
                                color = {Colors.positive}
                                onPress={() => this.addInput()}>
                                <Text style={styles.buttonText}>+</Text>
                            </Button>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 50,
        width: 370,
        height: 600,
        backgroundColor: Colors.card,
        borderWidth: 0,
        alignSelf: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: Colors.text,
        fontSize: 27,
        alignSelf: 'center',
        margin: 15,
    },
    textLine:{
        flexDirection: 'row',
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
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.text,
    },
    buttonView: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'center',
    },
})
