/* eslint-disable prettier/prettier */
import * as SQLite from "expo-sqlite";

export class ExerciseWithinRoutine{

    constructor(exerciseID, routineId, numberOfReps,numberOfSets, weight, placeInOrder) {
        this.exerciseID = exerciseID
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

export function updateExcerciseName(exerciseName, exerciseID) {
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


