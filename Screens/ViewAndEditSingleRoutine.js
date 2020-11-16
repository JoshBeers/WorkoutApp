/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, FlatList, Button} from 'react-native';
import { listStyle } from '../Themes/Styles';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-elements';
import {Abs, Arm, Back, Chest, Rear} from '../img/WorkoutIcons';
import {getAllRoutinesWithOutExercises, getSpecificRoutine, Routine} from '../Classes/Routine';


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
            this.setState({
                routine : result
            },function () {
                console.log("single routine screen ", this.state)
            })
        })
    }

/*


 */

    render() {
        return (
            <View style={listStyle.screen}>
                <View style={listStyle.container}>
                    <Text style={listStyle.titleText}>Routine Name</Text>
                </View>
                <Text>{this.state.routine.name}</Text>
                <FlatList
                    data={this.state.routine.exercises}
                    renderItem={({item}) => (
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>

                    )}
                    keyExtractor={item => item.id}
                />
                <Button
                    onPress={()=> {
                    this.props.navigation.navigate('WorkoutScreen',{
                    routine: this.state.routine
                    });}}
                        title='Workout'>
                    <Text>WORKOUT</Text>
                </Button>
            </View>
        );
    }
}
