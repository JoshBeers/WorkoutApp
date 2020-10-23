import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Cardio} from './WorkoutTabs';
import * as SQLite from "expo-sqlite";

export default class ChooseWorkoutScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  //method returns a list of routines
  //has not been tested
  getRoutines(){
    
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select * from routines;",[],(_,rows) =>{

        let temp = [];
        console.log("cWOSSQL", rows.rows)
        console.log("cWOSSQL", rows.rows.length)


        for(i = 0; i<rows.rows.length; i++){
          temp.push(rows.rows._array[i].date)
          //console.log("sqlloggg",rows.rows._array[i])
        }

        console.log("cWOSSQL", temp)

        return rows;
      })
    })

  }




  render() {
    return (
      <View style={styles.workout}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Choose a Workout</Text>
          <SegmentedControlTab
            values={['Cardio', 'Weights']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
            tabTextStyle={styles.tabText}
            activeTabTextStyle={{color: Colors.textDark}}
          />
          {this.state.selectedIndex === 0 ? <Cardio /> : <Cardio />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workout: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  titleText: {
    color: Colors.text,
    fontSize: 27,
    marginBottom: 20,
  },
  tabContainer: {
    height: 33,
    backgroundColor: Colors.card,
    marginBottom: 12,
  },
  tab: {
    backgroundColor: Colors.background,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: Colors.btn,
    marginTop: 2,
  },
  tabText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  gridView: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
});


class routien{

}

