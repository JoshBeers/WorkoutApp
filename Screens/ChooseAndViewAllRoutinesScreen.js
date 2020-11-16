/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Card} from 'react-native-elements';
import Colors from '../Themes/Colors';
import {deleteRoutine, getAllRoutinesWithOutExercises} from '../Classes/Routine';
import * as navigation from 'react-navigation';
import ViewAndEditSingleRoutine from './ViewAndEditSingleRoutine';
import NativeStackNavigator from 'react-native-screens/src/native-stack/navigators/createNativeStackNavigator';

export default class ChooseAndViewAllRoutinesScreen extends React.Component {


  constructor() {
    super();
    this.state = {
      routineList: [],
      // loading state where when data retrieve returns data
      loadingTrue: false,
    };
    console.log('teasdasdast');
  }

  componentDidMount() {
    console.log('as');
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
    console.log(routine.id);
    deleteRoutine(routine, (results) =>{
      console.log(results);
      this.getListOfRoutines();
    })



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
                    <View style={{
                      flexDirection: 'row',
                    }}>
                      <TouchableOpacity
                          onPress={() =>
                              this.props.navigation.navigate('SingleRoutineScreen', {
                                routineID: item.id
                              })
                          }>
                        <Card containerStyle={styles.card}>
                          <Text style={styles.text}>{item.name}</Text>
                        </Card>
                      </TouchableOpacity>
                      <View style={styles.dButton}>
                        <Button
                            title='Delete'
                            color={Colors.btn}
                            onPress={() => this.deleteRoutine(item)}>
                          <Text style={styles.buttonText}>Delete</Text>
                        </Button>
                      </View>
                    </View>
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
    width: 275,
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
  buttonText: {
    fontWeight: 'bold',
    fontSize: 8,
    color: Colors.text,
  },
  dButton: {
    width: 69,
    marginTop: 40,
  }
});
