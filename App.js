import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import * as SQLite from 'expo-sqlite';


//Sqlite stuff

const db = SQLite.openDatabase("workoutAppDB.db");






function createTables() {
    db.transaction(tx=> {

        try{
            tx.executeSql("CREATE table [if not exists] Workouts(ID integer primary key DESC, date date not null);");
        }catch (error){}

        try{
            tx.executeSql("Create table [if not exists] Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120));");
        }catch (error){}

        try{
            tx.executeSql("create table [if not exists] CompletedExercises(ID integer primary key DESC, exerciseId int not null,numberOfReps int not null,numberOfSets int not null, workOutID int not null,FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(workOutID) REFERENCES Workouts(ID));");
        }catch (error){}

        try{
            tx.executeSql("create table [if not exists] WorkoutRoutines(ID integer primary key DESC, name varchar(30) not null);");
        }catch (error){}

        try{
            tx.executeSql("create table [if not exists] ExercisesWithinRoutines(exerciseID int not null, routineID int not null, numberOFReps int not null, numberOfSets int not Null, placeInOrder int not null, FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(routineID) REFERENCES WorkoutRoutines(ID), Primary key(exerciseId,routineID));");
        }catch (error){}
    })

}
createTables()


function createDummyData(){

    db.transaction(tx=>{
        tx.executeSql("insert into workouts(date) values('2020-01-15');")


    })
}



function clearDB(){
    db.transaction(tx=>{
        tx.executeSql("Delete from Workouts")
    })
}






import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBuyPSc2O6-BZ7oj0AKGxm7pUdApKxAFUI',
  authDomain: 'ggc-fitness-app.firebaseapp.com',
  databaseURL: 'https://ggc-fitness-app.firebaseio.com',
  projectId: 'ggc-fitness-app',
  storageBucket: 'ggc-fitness-app.appspot.com',
  messagingSenderId: '83945559531',
  appId: '1:83945559531:web:1ee8110b78ef4ccf1c75ae',
  measurementId: 'G-0QPQF0ZNLJ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  // Home: HomeScreen,
  Workout: WorkoutScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
