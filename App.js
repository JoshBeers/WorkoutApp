import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateRoutineScreen from './Screens/CreateRoutineScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import * as SQLite from 'expo-sqlite';

//Sqlite stuff

const db = SQLite.openDatabase('workoutAppDB.db');

function createTables() {
  db.transaction((tx) => {
    try {
      tx.executeSql(
        'CREATE table if not exists Workouts(ID integer primary key DESC, date date not null);',
      );
    } catch (error) {}

    try {
      tx.executeSql(
        'Create table if not exists Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120),doesUseWeight boolean not null);',
      );
    } catch (error) {}

    try {
      tx.executeSql(
        'create table if not exists CompletedExercises(ID integer primary key DESC, exerciseId int not null,numberOfReps int not null,numberOfSets int not null,weight integer, workOutID int not null,FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(workOutID) REFERENCES Workouts(ID));',
      );
    } catch (error) {}

    try {
      tx.executeSql(
        'create table if not exists routines(ID integer primary key DESC, name varchar(30) not null,placeOnList integer);',
      );
    } catch (error) {}

    try {
      tx.executeSql(
        'create table if not exists ExercisesWithinRoutines(exerciseID int not null, routineID int not null, numberOFReps int not null, numberOfSets int not Null,weight integer, placeInOrder int not null, FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(routineID) REFERENCES WorkoutRoutines(ID), Primary key(exerciseId,routineID));',
      );
    } catch (error) {}
  });
}


/*
these are the method calls being run

 */



createTables();
createDummyData();






import * as firebase from 'firebase';
import ChooseWorkoutScreen from './Screens/ChooseWorkoutScreen';
import FitnessAnalyticsScreen from './Screens/FitnessAnalyticsScreen';

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
  Home: CreateRoutineScreen,
  // Workout: WorkoutScreen,
  // ChooseWorkout: ChooseWorkoutScreen,
  // FitnessAnalytics: FitnessAnalyticsScreen,
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


// stuff for dummyData
function createDummyData() {
  console.log("sqllog", "createDD")
  clearDB()
  createWorkoutDummyData()
  createExercisesDD()
  creatCompletedExercisesDData()
  createRoutinesDD()
  createExercisesWithinRoutineDD()
  logDataBase()
}


/*
one workout with date 10/20/2020 and id 1
 */
function createWorkoutDummyData(){
  db.transaction((tx) => {
    tx.executeSql("insert into workouts(id,date) values(1,'2020-10-20');");
  });
  console.log("sqllog", "workouts created")
}

/*
three completed exercises
1. id = 1, exerciseId= 1, numberOfReps =5, numberOfSets = 3,weight = null, workOutID =1
2. id = 2, exerciseId= 2, numberOfReps =6, numberOfSets = 2,weight = 5, workOutID =1
3. id = 3, exerciseId= 3, numberOfReps =5, numberOfSets = 6,weight = null,  workOutID =1
 */
function creatCompletedExercisesDData(){
  db.transaction((tx) => {
    tx.executeSql("insert into CompletedExercises(ID,exerciseId,numberOfReps,numberOfSets,workOutID) values(1,1,5,3,1);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into CompletedExercises(ID,exerciseId,numberOfReps,numberOfSets,workOutID,weight) values(2,2,6,2,1, 5);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into CompletedExercises(ID,exerciseId,numberOfReps,numberOfSets,workOutID) values(3,3,5,6,1);");
  });
  console.log("sqllog", "completed exercises created")
}

/*
three exercises
1. id = 1, name = 'push up', description = 'it is a push up', doesUseWeight = false
2. id = 2, name = 'dead lift', description = 'is a deadlift', doesUseWeight = true
2. id = 3, name = 'curl up', description = null, doesUseWeight = false

 */
function createExercisesDD(){
  db.transaction((tx) => {
    tx.executeSql("insert into Exercises(ID,name,description,doesUseWeight) values(1,'push up','it is a push up',false);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into Exercises(ID,name,description,doesUseWeight) values(2,'dead lift','is a deadlift',true);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into Exercises(ID,name,doesUseWeight) values(3,'curl up',false);");
  });
  console.log("sqllog", "exercises created")
}


/*
one routine
id = 1, name = 'main routine', placeOnList = 1
 */
function createRoutinesDD(){
  db.transaction((tx) => {
    tx.executeSql("insert into routines(ID,name,placeOnList) values(1,'main routine',1);");
  });
  console.log("sqllog", "routine created")
}

/*
3
1. exerciseID = 1, routineID =1  numberOFReps = 3, numberOfSets = 2, weight = null, placeInOrder =1
2. exerciseID = 2, routineID =1  numberOFReps = 5, numberOfSets = 3, weight = 5, placeInOrder =2
2. exerciseID = 3, routineID =1  numberOFReps = 10, numberOfSets = 1, weight = null, placeInOrder =3
 */
function createExercisesWithinRoutineDD(){
  db.transaction((tx) => {
    tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,numberOFReps,numberOfSets,placeInOrder) values(1,1,3,2,1);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,numberOFReps,numberOfSets,weight,placeInOrder) values(2,1,5,3,5,2);");
  });
  db.transaction((tx) => {
    tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,numberOFReps,numberOfSets,placeInOrder) values(3,1,10,1,3);");
  });
  console.log("sqllog", "ExercisesWithinRoutine created")
}

function clearDB() {
  db.transaction((tx) => {
    tx.executeSql('Delete from Workouts');
  });
  console.log("sqllog", "db cleared")
}

function logDataBase() {

  //logs workout table
  db.transaction(tx =>{
    tx.executeSql("select * from Workouts;",[],(_,rows) =>{
      console.log("sqllog_Workouts", rows.rows)
    })
  })

  //logs CompletedExercises table
  db.transaction(tx =>{
    tx.executeSql("select * from CompletedExercises;",[],(_,rows) =>{
      console.log("sqllog_CompletedExercises", rows.rows)
    })
  })

  //logs Exercises table
  db.transaction(tx =>{
    tx.executeSql("select * from Exercises;",[],(_,rows) =>{
      console.log("sqllog_Exercises", rows.rows)
    })
  })

  //logs routines table
  db.transaction(tx =>{
    tx.executeSql("select * from routines;",[],(_,rows) =>{
      console.log("sqllog_routines", rows.rows)
    })
  })

  //logs ExercisesWithinRoutines table
  db.transaction(tx =>{
    tx.executeSql("select * from ExercisesWithinRoutines;",[],(_,rows) =>{
      console.log("sqllog_ExercisesWithinRoutines", rows.rows)
    })
  })


}




