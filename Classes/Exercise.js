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
