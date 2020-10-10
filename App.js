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
            tx.executeSql("CREATE table Workouts(ID integer primary key DESC, date date not null);");
            console.log("sqlLog","Workouts table Created")
        }catch (error){console.log("sqlLog","Workouts table Exists")}

        try{
            tx.executeSql("Create table Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120));");
            console.log("sqlLog","Exercises table Created")
        }catch (error){}

        try{
            tx.executeSql("create table CompletedExercises(ID integer primary key DESC, exerciseId int not null,numberOfReps int not null,numberOfSets int not null, workOutID int not null,FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(workOutID) REFERENCES Workouts(ID));");
        }catch (error){}

        try{
            tx.executeSql("create table WorkoutRoutines(ID integer primary key DESC, name varchar(30) not null);");
        }catch (error){}

        try{
            tx.executeSql("create table ExercisesWithinRoutines(exerciseID int not null, routineID int not null, numberOFReps int not null, numberOfSets int not Null, placeInOrder int not null, FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(routineID) REFERENCES WorkoutRoutines(ID), Primary key(exerciseId,routineID));");
    }catch (error){}


    })

}
createTables()



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

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen,
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
