/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import {Card} from 'react-native-elements';
import * as SQLite from "expo-sqlite";

class SavedRoutinesScreen extends Component {

  //method returns a list of routines
  //has not been tested
  getRoutines(){
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
      tx.executeSql("select * from routines;",[],(_,rows) =>{

        console.log("sqllog_SavedRoutinesScreen_routines", rows.rows)

        return rows.rows;
      })
    })

  } 

  
    render() {
    }
}

const styles = StyleSheet.create({
});

module.exports = SavedRoutinesScreen;