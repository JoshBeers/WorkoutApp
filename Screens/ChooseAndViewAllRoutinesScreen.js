import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-elements';
import Colors from '../Themes/Colors';
import {listStyle} from '../Themes/Styles';
import {getAllRoutinesWithOutExercises} from '../Classes/Routine';
import * as navigation from 'react-navigation';
import ViewAndEditSingleRoutine from './ViewAndEditSingleRoutine';
import NativeStackNavigator from 'react-native-screens/src/native-stack/navigators/createNativeStackNavigator';

export default class ChooseAndViewAllRoutinesScreen extends React.Component {
  state = {
    routineList: [],
    // loading state where when data retrieve returns data
    loadingTrue: true,
  };

  constructor() {
    super();
    getAllRoutinesWithOutExercises();
    console.log('test');
  }

  //method returns a list of routines
  //has not been tested
  componentDidMount() {
    console.log('test');
    getAllRoutinesWithOutExercises((result) => {
      this.setState(
        {
          routineList: result,
        },
        function () {
          console.log(this.state.routineList);
        },
      );
    });
  }

  // callback for the flatlist for rendering each item, and pass data as argument
  renderItem(data) {
    return (
      <TouchableOpacity onPress={() => this.seeDetails(data.item.id)}>
        <Card containerStyle={listStyle.item}>
          <Text>{data.item.name}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    const {routineList, loading} = this.state;

    if (!loading) {
      return (
        <View style={listStyle.screen}>
          <Text style={listStyle.titleText}>Saved Routines</Text>
          <FlatList
            data={this.state.routineList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else {
      return <ActivityIndicator size="large" color={Colors.btn} />;
    }
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
});
