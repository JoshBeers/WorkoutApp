import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import Colors from "../../Themes/Colors";

export class WorkoutCard extends Component{
    state = {
        id: '',
        name: '',
        isWeighted: false,
        textInput: [],
        inputData: [],
        count: 1,
    }

    constructor(props){
        super(props);
        this.state.id = props.id;
        this.state.name = props.name;
        this.state.isWeighted = props.isWeight;
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
                <View contentContainerStyle = {styles.textLine}
                      key={this.state.count}>
                    <View style={styles.textField}>
                        <Text>{this.state.count}</Text>
                    </View>
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="REP"
                            onChangeText={(text) => rep = text}
                            keyboardType={"number-pad"}
                            style = {{flex: 1}}
                        />
                    </View>
                    <View style={styles.textField}>
                        <TextInput
                            placeholder="WEIGHT"
                            onChangeText={(text) => weight = text}
                            keyboardType={"number-pad"}
                            style = {{flex: 1}}
                        />
                    </View>
                </View>
            );
            setInfo.push({'set': this.state.count, 'rep': rep, 'weight': weight});
        } else {
            textInput.push(
                <View style={styles.textField}
                      key={this.state.count}>
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

    finish = () => {
        this.setState({isDone : true});
        this.props.finishFunction(this.state.id, this.state.name, this.state.inputData);
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
                                onPress={() => this.finish()}
                                disabled={this.state.inputData.length === 0}>

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
        flex: 1,
        justifyContent: 'space-around',
    },
    textField: {
        alignSelf: 'center',
        backgroundColor: Colors.textFieldBackground,
        color: Colors.card,
        height: 40,
        width: 70,
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
