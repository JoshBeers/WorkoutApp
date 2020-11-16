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
import {deleteRoutine, getAllRoutinesWithOutExercises} from '../Classes/Routine';
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
    this.getListOfRoutines()
  }

  getListOfRoutines(){
   // console.log('test');
    getAllRoutinesWithOutExercises((result) => {
      this.setState(
          {
            routineList: result,
            loadingTrue: false
          },
          function () {
            console.log(this.state.routineList);
          },
      );
    });
  }

  deleteRoutine(routine){
    deleteRoutine(routine,this.getListOfRoutines())
  }

  // callback for the flatlist for rendering each item, and pass data as argument
  renderItem(data) {
    return (
      <TouchableOpacity onPress={() => this.seeDetails(data.item.id)}>
        <Card containerStyle={styles.item}>
          <Text>{data.item.name}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    if (!this.state.loadingTrue) {
      return (
        <View style={styles.screen}>
          <Text style={styles.titleText}>Saved Routines</Text>
          <FlatList
            data={this.state.routineList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SingleRoutineScreen', {
                    routineID: item.id,
                  })
                }>
                <Card containerStyle={styles.card}>
                  <Text style={styles.text}>{item.name}</Text>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    } else {
      return <ActivityIndicator size="large" color={Colors.btn} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 25,
  },
  screen: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    color: Colors.text,
    fontSize: 27,
    marginTop: 30,
  },
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
  item: {
    backgroundColor: Colors.card,
    padding: 35,
    marginVertical: 20,
    marginHorizontal: 16,
  },
});
