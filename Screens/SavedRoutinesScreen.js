/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import Colors from '../Themes/Colors';

export default class SavedRoutinesScreen extends Component {

  //method returns a list of routines
  //has not been tested
  getRoutines(){
    const db = SQLite.openDatabase('workoutAppDB.db');

    db.transaction(tx =>{
      tx.executeSql('select * from routines;',[],(_,rows) =>{

        console.log('sqllog_SavedRoutinesScreen_routines', rows.rows);

        return rows.rows;
      });
    });

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
    ];

    const Item = ({title}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({item}) => {
      return (
          <Item title={item.title}/>
      );
    };

    return (
        <View style={styles.savedRoutine}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Saved Routines</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
                data={savedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  savedRoutine: {
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
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
