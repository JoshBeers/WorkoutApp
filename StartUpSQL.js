import * as SQLite from "expo-sqlite";
import {db} from "./App";

//const db = SQLite.openDatabase("workoutAppDB.db");
export function createTables(callback) {
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
                'create table if not exists ExercisesWithinRoutines(exerciseID int not null, routineID int not null, placeInOrder int not null, FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(routineID) REFERENCES WorkoutRoutines(ID), Primary key(exerciseId,routineID));',
            );
        } catch (error) {}
        callback()
    });
}

// stuff for dummyData
export function createDummyData() {
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
export function createWorkoutDummyData(){
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
export function creatCompletedExercisesDData(){
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
export function createExercisesDD(){
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
export function createRoutinesDD(){
    db.transaction((tx) => {
        tx.executeSql("insert into routines(ID,name,placeOnList) values(1,'main routine',1);");
    });
    console.log("sqllog", "routine created")
}

/*
3
1. exerciseID = 1, routineID =1  placeInOrder =1
2. exerciseID = 2, routineID =1  placeInOrder =2
2. exerciseID = 3, routineID =1   placeInOrder =3
 */
export function createExercisesWithinRoutineDD(){
    db.transaction((tx) => {
        tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(1,1,1);");
    });
    db.transaction((tx) => {
        tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(2,1,2);");
    });
    db.transaction((tx) => {
        tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(3,1,3);");
    });
    console.log("sqllog", "ExercisesWithinRoutine created")
}


export function clearDB() {
    db.transaction((tx) => {
        tx.executeSql('Delete from Workouts');
    });
    console.log("sqllog", "db cleared")
}

export function logDataBase() {

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