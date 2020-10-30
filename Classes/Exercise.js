/* eslint-disable prettier/prettier */
import * as SQLite from "expo-sqlite";
import {db} from "../App";


/*
stuff for exerciuses that are wiuthin a routine

 */
export class ExerciseWithinRoutine{

    constructor(exerciseID, routineId, placeInOrder) {
        this.exerciseID = exerciseID
        this.routineId = routineId
        this.placeInOrder = placeInOrder
    }
}

//tested
export function addExerciseToRoutine(routineID,exercise, callback){
        db.transaction(tx => {

            //insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(2,1,2);
            tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(" +
                exercise.exerciseID + " , " +
                routineID + " , " +
                exercise.placeInOrder +
                " );")
            if (callback != null) {
                callback()
            }

        })
}

//tested
export function deleteExerciseFromRoutine(exercise:ExerciseWithinRoutine, callback){

    db.transaction(tx => {
        tx.executeSql("Delete from ExercisesWithinRoutines where " +
            "exerciseID = "+exercise.exerciseID+" and " +
            "routineId = "+exercise.routineId+";")
        if (callback != null) {
            callback()
        }
    })

}


//tested
export function getExerciseFromRoutine(routineID, callback){

    db.transaction(tx =>{
        tx.executeSql("select * from ExercisesWithinRoutines where routineID ="+ routineID +";",[],(_,rows) => {
           // console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
            let tempExercises = []


            for(let i = 0;i<rows.rows.length;i++){
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new ExerciseWithinRoutine(rows.rows.item(i).exerciseID,rows.rows.item(i).routineID, rows.rows.item(i).placeInOrder))
            }
            tempExercises.sort(((a:ExerciseWithinRoutine, b:ExerciseWithinRoutine) => a.placeInOrder-b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}

export function getAllExercisesWithinRoutines(callback){

    db.transaction(tx =>{
        tx.executeSql("select * from ExercisesWithinRoutines;",[],(_,rows) => {
            // console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
            let tempExercises = []


            for(let i = 0;i<rows.rows.length;i++){
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new ExerciseWithinRoutine(rows.rows.item(i).exerciseID,rows.rows.item(i).routineID, rows.rows.item(i).placeInOrder))
            }
            tempExercises.sort(((a:ExerciseWithinRoutine, b:ExerciseWithinRoutine) => a.placeInOrder-b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}






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
    db.transaction(tx =>{
        tx.executeSql("update Exercises set " +
            "name = '" + exercise.name + "'," +
            "description = '" + exercise.description +"', " +
            "doseUseWeight = '" + exercise.doesUseWeight +"'" +
            "where ID = " + exercise.exerciseID + ";",)
    })
}

//tested
export function createNewExerciseFromExercise(exercise: Exercise, callback){
    //'Create table if not exists Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120),doesUseWeight boolean not null);',
    db.transaction(tx => {
        tx.executeSql("insert into Exercises(name,description,doesUseWeight) values('" +
            exercise.name + "','" +
            exercise.description + "'," +
            exercise.doesUseWeight +
            ");",)
        if(callback != null){
            callback()
        }
    })
}

//tested
export function getAllExercises(callback) {

    db.transaction(tx => {
        tx.executeSql("select * from Exercises;", [], (_, rows) => {
            //console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
            let tempExercises = []


            for (let i = 0; i < rows.rows.length; i++) {
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new Exercise(rows.rows.item(i).ID, rows.rows.item(i).name, rows.rows.item(i).description, rows.rows.item(i).doesUseWeight))
            }
            tempExercises.sort(((a: ExerciseWithinRoutine, b: ExerciseWithinRoutine) => a.placeInOrder - b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })

    })
}

//tested
export function deleteExerciseById(id, callback){
    db.transaction(tx => {
        tx.executeSql("delete from Exercises where ID = "+id+";", [], () => {
            //console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
            if(callback != null){
                callback()
            }
        })
    })
}


/*
all of this can be done eaiser by one method
export function updateExerciseName(exerciseName, exerciseID) {

    db.transaction(tx =>{
        tx.executeSql("update Exercises set name = " + exerciseName + " where ID = " + exerciseID + ";",)
        })
}

export function updateExcerciseInfo(routineID, numberOfReps, numberOfSets, weight, placeInOrder) {

    db.transaction(tx =>{
        tx.executeSql("update ExercisesWithinRoutines set numberOFRep = " + numberOfReps + ", numberOfSets = " + numberOfSets + ", weight = " + weight + ", placeInOrder = " + placeInOrder + " where routineID = " + routineID + ";",)
        })
}
 */


/*
completed exercise stuff

create table if not exists CompletedExercises(ID integer primary key AUTOINCREMENT, exerciseId int not null,numberOfReps int not null,numberOfSets int not null,averageWeight integer, workOutID int not null,FOREIGN KEY(exerciseId) REFERENCES Exercises(ID),FOREIGN KEY(workOutID) REFERENCES Workouts(ID));',
 */
export class CompleteExercise{
    constructor(ID: number, exerciseId: number,workoutId:number, numberOfReps:number , numberOfSets:number, averageWeight, date) {
        this.ID =ID
        this.exerciseId = exerciseId
        this.workoutId = workoutId
        this.numberOfReps = numberOfReps
        this.numberOfSets = numberOfSets
        this.averageWeight = averageWeight
        this.date = date
    }

}

export function getAllCompleteExerciseBySpecificExerciseID(exerciseID, callback){

    tx.executeSql("select * from CompletedExercises where exerciseID = ?;", [exerciseID], (_, rows) => {
        //console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
        let tempExercises = []

        for (let i = 0; i < rows.rows.length; i++) {
            //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
            tempExercises.push(new CompleteExercise(rows.rows.item(i).ID, rows.rows.item(i).exerciseId, rows.rows.item(i).workOutID, rows.rows.item(i).numberOfReps,rows.rows.item(i).averageWeight, null ))
        }

        tempExercises.sort(((a: ExerciseWithinRoutine, b: ExerciseWithinRoutine) => a.placeInOrder - b.placeInOrder))
        if(callback != null){
            callback(tempExercises)
        }
    })




}





export function saveExerciseFromCompletedExercises(exercise:CompleteExercise) {
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



