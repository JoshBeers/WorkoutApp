/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import Colors from '../Themes/Colors';
import {listStyle} from '../Themes/Styles';
import {getAllRoutinesWithOutExercises} from "../Classes/Routine";

export default class ChooseAndViewAllRoutinesScreen extends Component {

  constructor() {
    super();
    this.state = {
      routineList: []
    }
  }

  //method returns a list of routines
  //has not been tested
  componentDidMount() {
    getAllRoutinesWithOutExercises((result)=>{
      this.setState({
        routineList: result
      }, function (){
        console.log(this.state)
      })

    })
  }

  render() {
    const savedData = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
        id: '57694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
      },
      {
        id: '56694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Fifth Item',
      },
      {
        id: '55694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Sixth Item',
      },
    ];

    const Item = ({title}) => (
        <View style={listStyle.item}>
          <Text style={listStyle.text}>{title}</Text>
        </View>
    );

    const renderItem = ({item}) => {
      return (
          <Item title={item.title}/>
      );
    };

    return (
        <View style={listStyle.screen}>
          <View style={listStyle.container}>
            <Text style={listStyle.titleText}>Saved Routines</Text>
          </View>
          <FlatList
              data={savedData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        </View>
    );
  }
}
