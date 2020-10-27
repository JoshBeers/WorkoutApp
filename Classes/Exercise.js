/* eslint-disable prettier/prettier */
import * as SQLite from "expo-sqlite";


/*
stuff for exerciuses that are wiuthin a routine

 */
export class ExerciseWithinRoutine{

    constructor(exerciseID, routineId, numberOfReps,numberOfSets, weight, placeInOrder) {
        this.exerciseID = exerciseID
        this.routineId = routineId
        this.numberOfReps = numberOfReps
        this.numberOfSets = numberOfSets
        this.placeInOrder = placeInOrder
        this.weight = weight
    }
}


export function addExerciseToRoutine(routineID,exercise:ExerciseWithinRoutine){
    const db = SQLite.openDatabase("workoutAppDB.db");

    if(exercise.weight == null) {
        db.transaction(tx => {
            tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,numberOFReps,numberOfSets,placeInOrder) values(" +
                exercise.exerciseID + "," +
                routineID + "," +
                exercise.numberOfReps + "," +
                exercise.numberOfSets + "," +
                exercise.placeInOrder +
                ");",)
        })
    }else{
        db.transaction(tx => {
            tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,numberOFReps,numberOfSets,placeInOrder, weight) values(" +
                exercise.exerciseID + "," +
                routineID + "," +
                exercise.numberOfReps + "," +
                exercise.numberOfSets + "," +
                exercise.placeInOrder +"," +
                exercise.weight +
                ");",)
        })
    }
}

export function updateExerciseWithinRoutineFromExerciseWithinRoutine(exercise: ExerciseWithinRoutine){
    const db = SQLite.openDatabase("workoutAppDB.db");
    if(exercise.weight == null || exercise.weight == 0) {
        db.transaction(tx => {
            tx.executeSql("update ExercisesWithinRoutines set" +
                " numberOfReps = "+exercise.numberOfReps + "," +
                " numberOfSets = "+exercise.numberOfSets + "," +
                " placeInOrder = "+exercise.placeInOrder + "," +
                " weight = null"+
                "where " +
                "exerciseID = "+exercise.exerciseID+"," +
                "routineId = "+exercise.routineId+";" )
        })
    }else{
        db.transaction(tx => {
            tx.executeSql("update ExercisesWithinRoutines set" +
                " numberOfReps = "+exercise.numberOfReps + "," +
                " numberOfSets = "+exercise.numberOfSets + "," +
                " placeInOrder = "+exercise.placeInOrder + "," +
                " weight = "+exercise.weight +
                "where " +
                "exerciseID = "+exercise.exerciseID+"," +
                "routineId = "+exercise.routineId+";" )
        })
    }
}

export function deleteExerciseFromRoutine(exercise:ExerciseWithinRoutine){
    const db = SQLite.openDatabase("workoutAppDB.db");
    db.transaction(tx => {
        tx.executeSql("Delete from ExercisesWithinRoutines where " +
            "exerciseID = "+exercise.exerciseID+"," +
            "routineId = "+exercise.routineId+";")
    })
}

/*
export function getExerciseFromRoutine(routineID, callback):ExerciseWithinRoutine[]{
    const db = SQLite.openDatabase("workoutAppDB.db");
    db.transaction(tx =>{
        tx.executeSql("select * from ExercisesWithinRoutines where routineId ="+ routineID +";",[],(_,rows) => {
            console.log("sqllog_method_getExerciseFromRoutine",rows.rows)
            callback(rows.rows)
            /*
            let tempExercises = []


            for(let i = 0;i<rows.rows.length;i++){
                tempExercises.push(new ExerciseWithinRoutine(rows.rows[i].exerciseID,rows.rows[i].routineId,rows.rows[i].numberOfReps, rows.rows[i].numberOfSets,rows.rows[i].weight, rows.rows[i].placeInOrder))
            }

            tempExercises.sort(((a:ExerciseWithinRoutine, b:ExerciseWithinRoutine) => a.placeInOrder-b.placeInOrder))
            callback(tempExercises)
            console.log("sqllog_method_getExerciseFromRoutine","finished")


            callback(null)
        })
    })
}

 */




/*
stuff for exercises that are bases to be added to routines

 */



export class Exercise{

    constructor(exerciseID:number , name: string, description:string, doesUseWeight:boolean) {
        this.exerciseID = exerciseID
        this.name = name
        this.description = description
        this.doesUseWeight = doesUseWeight
    }

}


export function updateExerciseFromExercise(exercise:Exercise){
    const db = SQLite.openDatabase("workoutAppDB.db");

    db.transaction(tx =>{
        tx.executeSql("update Exercises set " +
            "name = '" + exercise.name + "'," +
            "description = '" + exercise.description +"', " +
            "doseUseWeight = '" + exercise.description +"'" +
            "where ID = " + exercise.exerciseID + ";",)
    })
}

export function createNewExerciseFromExercise(exercise: Exercise){
    const db = SQLite.openDatabase("workoutAppDB.db");

    //'Create table if not exists Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120),doesUseWeight boolean not null);',
    db.transaction(tx => {
        tx.executeSql("insert into Exercises(name,description,doesUseWeight) values(" +
            exercise.name + "," +
            exercise.description + "," +
            exercise.description +"," +
            ");",)
    })
}

/*

all of this can be done eaiser by one method
export function updateExerciseName(exerciseName, exerciseID) {
    const db = SQLite.openDatabase("workoutAppDB.db");
    db.transaction(tx =>{
        tx.executeSql("update Exercises set name = " + exerciseName + " where ID = " + exerciseID + ";",)
        })
}

export function updateExcerciseInfo(routineID, numberOfReps, numberOfSets, weight, placeInOrder) {
    const db = SQLite.openDatabase("workoutAppDB.db");
    db.transaction(tx =>{
        tx.executeSql("update ExercisesWithinRoutines set numberOFRep = " + numberOfReps + ", numberOfSets = " + numberOfSets + ", weight = " + weight + ", placeInOrder = " + placeInOrder + " where routineID = " + routineID + ";",)
        })
}
 */


/*
completed exercise stuff

create table if not exists CompletedExercises(ID integer primary key DESC, exerciseId int not null,numberOfReps int not null,numberOfSets int not null,weight integer, workOutID int not null,
 */
export class CompleteExercise{
    constructor(ID: number, exerciseId: number,workoutId:number, numberOfReps:number , numberOfSets:number, weight) {
        this.ID =ID
        this.exerciseId = exerciseId
        this.workoutId = workoutId
        this.numberOfReps = numberOfReps
        this.numberOfSets = numberOfSets
        this.weight = weight
    }

}

export function saveExerciseFromCompletedExercises(exercise:CompleteExercise) {
    const db = SQLite.openDatabase("workoutAppDB.db");
    db.transaction(tx =>{
        tx.executeSql("insert into CompletedExercises(exerciseId,numberOfReps,numberOfSets,workOutID) values(" +
        exercise.ID + "," +
        exercise.numberOfReps + "," +
        exercise.numberOfSets + "," +
        exercise.weight + "," +
        exercise.workoutId +
        ");",)
    })
}

