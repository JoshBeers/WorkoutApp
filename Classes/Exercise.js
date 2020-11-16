/* eslint-disable prettier/prettier */
import * as SQLite from "expo-sqlite";
import {db} from "../App";
import {CompletedWorkout, getMapOfCompleteWorkoutIDsToDates} from "./Workout";


/*
stuff for exerciuses that are wiuthin a routine

 */
export class ExerciseWithinRoutine{
    constructor(ID,exerciseID, routineId, placeInOrder, name) {
        this.ID = ID
        this.exerciseID = exerciseID
        this.routineId = routineId
        this.placeInOrder = placeInOrder
        this.name = name
    }
}

//tested
export function addExerciseToRoutine(routineID,exercise, callback){
    console.log("sqllog_method_addExerciseToRoutine",exercise.exerciseID,routineID,exercise.placeInOrder)
        db.transaction(tx => {
            //insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(2,1,2);
            tx.executeSql("insert into ExercisesWithinRoutines(exerciseID,routineID,placeInOrder) values(?,?,?);",[exercise.exerciseID,routineID,0],(_,rows) =>{
               console.log("sqllog_method_addExerciseToRoutine")
                if (callback != null) {
                    callback()
                }
            })


        })
}

export function addMultipleExercisesToRoutine(routineID,exercises, callback){
    console.log("sqllog_method_addExercisesToRoutine_start  ", exercises.length)
    for(let i = 0; i<exercises.length ; i++){
        if(i == exercises.length-1){
            console.log("sqllog_method_addExercisesToRoutine_end")
            addExerciseToRoutine(routineID, exercises[i], function (){

                callback()
            })
        }else{
            addExerciseToRoutine(routineID, exercises[i])
        }
        console.log("sqllog_method_addExercisesToRoutine",i)
    }
}

export function deleteExercisesUnderARoutine(routineID,callback){
    db.transaction(tx => {
        tx.executeSql("Delete from ExercisesWithinRoutines where routineID = ? ;",[routineID], (_,rows) =>{
            if (callback != null) {
                callback()
            }
        })
    })
}




//tested
/*

 */
export function deleteExerciseFromRoutine(exercise:ExerciseWithinRoutine, callback){
    db.transaction(tx => {
        tx.executeSql("Delete from ExercisesWithinRoutines where ID = ? ;",[exercise.ID], (_,rows) =>{
            if (callback != null) {
                callback()
            }
        })
    })
}


//tested
export function getExerciseFromRoutine(routineID, callback){

    db.transaction(tx =>{
        tx.executeSql("select * from ExercisesWithinRoutines inner join Exercises on ExercisesWithinRoutines.exerciseID = Exercises.ID where routineID ="+ routineID +";",[],(_,rows) => {
            console.log("sqllog_method_getExerciseFromRoutine_rows id: ",routineID," res  ",rows.rows)
            let tempExercises = []

            for(let i = 0;i<rows.rows.length;i++){
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new ExerciseWithinRoutine(rows.rows.item(i).ID,rows.rows.item(i).exerciseID,rows.rows.item(i).routineID, rows.rows.item(i).placeInOrder,rows.rows.item(i).name))
            }
           // tempExercises.sort(((a:ExerciseWithinRoutine, b:ExerciseWithinRoutine) => a.placeInOrder-b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}

export function getAllExercisesWithinRoutines(callback){

    db.transaction(tx =>{
        tx.executeSql("select * from ExercisesWithinRoutines;",[],(_,rows) => {
             //console.log("sqllog_method_getAllExercisesWithinRoutines_rows",rows.rows)
            let tempExercises = []


            for(let i = 0;i<rows.rows.length;i++){
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new ExerciseWithinRoutine(rows.rows.item(i).ID,rows.rows.item(i).exerciseID,rows.rows.item(i).routineID, rows.rows.item(i).placeInOrder))
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
    constructor(exerciseID:number , name: string, description:string, doesUseWeight:boolean, isCardio:boolean) {
        this.exerciseID = exerciseID
        this.name = name
        this.description = description
        this.doesUseWeight = doesUseWeight
        this.isCardio = isCardio
        this.isSelected = false
    }
}

//tested
export function createNewExerciseFromExercise(exercise: Exercise, callback){
    //'Create table if not exists Exercises(ID integer primary key DESC, name varchar(30) not null, description varchar(120),doesUseWeight boolean not null);',
    db.transaction(tx => {
        tx.executeSql("insert into Exercises(name,description,doesUseWeight,isCardio) values('" +
            exercise.name + "','" +
            exercise.description + "'," +
            exercise.doesUseWeight +"," +
            exercise.isCardio +
            ");",[],(_,rows) =>{
            //console.log("sqllog_method_addExerciseToRoutine")
            if (callback != null) {
                callback()
            }
        })
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
                tempExercises.push(new Exercise(rows.rows.item(i).ID, rows.rows.item(i).name, rows.rows.item(i).description, rows.rows.item(i).doesUseWeight,rows.rows.item(i).isCardio))
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
        tx.executeSql("delete from Exercises where ID = "+id+";", [], (_,rows) =>{
            //console.log("sqllog_method_addExerciseToRoutine")
            if (callback != null) {
                callback()
            }
        })
    })
}



/*
completed exercise stuff

CompletedExercises(ID integer primary key AUTOINCREMENT, exerciseId int not null,numberOfReps int not null,numberOfSets int not null,averageWeight integer, workOutID int not null,
*/
export class CompleteExercise{
    constructor(ID: number, exerciseId: number ,workoutID:number, numberOfReps:number , numberOfSets:number, averageWeight, date) {
        this.ID =ID
        this.exerciseId = exerciseId
        this.workoutID = workoutID
        this.numberOfReps = numberOfReps
        this.numberOfSets = numberOfSets
        this.averageWeight = averageWeight
        this.date = date
    }
}

export function getAllCompleteExerciseBySpecificExerciseID(exerciseID, callback){
    getMapOfCompleteWorkoutIDsToDates(function (result){
        let map = result

        getCompleteExercisesForSpecificExerciseID(exerciseID, function (result){
            let tempExercises = result

            for(let i = 0 ; i< result.length; i++){
                tempExercises[i].date = map.get(result[i].workoutID)
            }
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}

function getCompleteExercisesForSpecificExerciseID(exerciseID,callback){
    db.transaction(tx => {
        tx.executeSql("select * from CompletedExercises where exerciseId = ?;", [exerciseID], (_, rows) => {
            //console.log("sqllog_method_getCompleteExercisesForSpecificExerciseID_rows",rows.rows)
            let tempExercises = []

            for (let i = 0; i < rows.rows.length; i++) {
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new CompleteExercise(rows.rows.item(i).ID, rows.rows.item(i).exerciseId, rows.rows.item(i).workOutID, rows.rows.item(i).numberOfReps, rows.rows.item(i).numberOfSets, rows.rows.item(i).averageWeight, null))
            }


            //tempExercises.sort(((a: ExerciseWithinRoutine, b: ExerciseWithinRoutine) => a.placeInOrder - b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}

export function getCompletedExercisesForWorkout(workoutID,callback){
    db.transaction(tx => {
        tx.executeSql("select * from CompletedExercises where workOutID = ?;", [workoutID], (_, rows) => {
            //console.log("sqllog_method_getCompleteExercisesForSpecificExerciseID_rows",rows.rows)
            let tempExercises = []

            for (let i = 0; i < rows.rows.length; i++) {
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempExercises.push(new CompleteExercise(rows.rows.item(i).ID, rows.rows.item(i).exerciseId, rows.rows.item(i).workOutID, rows.rows.item(i).numberOfReps, rows.rows.item(i).numberOfSets, rows.rows.item(i).averageWeight, null))
            }
            //tempExercises.sort(((a: ExerciseWithinRoutine, b: ExerciseWithinRoutine) => a.placeInOrder - b.placeInOrder))
            if(callback != null){
                callback(tempExercises)
            }
        })
    })
}

export function saveExerciseFromCompletedExercises(exercise:CompleteExercise, callback) {
    db.transaction(tx =>{
        tx.executeSql("insert into CompletedExercises(exerciseId,numberOfReps,numberOfSets,averageWeight,workOutID) values('" +
        exercise.exerciseId + "'," +
        exercise.numberOfReps + "," +
        exercise.numberOfSets + "," +
        exercise.averageWeight + "," +
        exercise.workoutID +
        ");",[],(_,rows) =>{
            if (callback != null) {
                callback()
            }
        })
    })
}

export function addMultipleCompleteExercisesToCompleteWorkout(completeWorkout:CompletedWorkout, callback){
    for(let i = 0; i<completeWorkout.completedExercises.length ; i++){
        completeWorkout.completedExercises[i].workoutID = completeWorkout.ID
        if(i == completeWorkout.completedExercises.length-1){
            saveExerciseFromCompletedExercises(completeWorkout.completedExercises[i], function (){
                callback()
            })
        }else{
            saveExerciseFromCompletedExercises(completeWorkout.completedExercises[i])
        }
        //console.log("sqllog_method_addExercisesToRoutine",i)
    }
}

export class ExerciseStats{
    constructor(exerciseId,name, averageNumberOfReps, averageNumberOfSets, averageWeight) {
        this.exerciseId = exerciseId
        this.exerciseName = name
        this.averageNumberOfReps = averageNumberOfReps
        this.averageNumberOfSets = averageNumberOfSets
        this.averageWeight = averageWeight
    }
}
//
export function getAverageMetricsForExercise(exerciseID,callback){
    //console.log("sqllog_method_getAverageMetricsForExercise",exerciseID)
    db.transaction(tx => {
        tx.executeSql("select AVG(numberOfReps) as averageNumberOfReps, avg(numberOfSets) as averageNumberOfSets, avg(averageWeight) as averageWeight, Exercises.name as Name from CompletedExercises inner join Exercises on CompletedExercises.exerciseId = Exercises.ID where exerciseId = ?;", [exerciseID], (_, rows) => {
           // console.log("sqllog_method_getAverageMetricsForExercise",rows.rows)
            if(callback){
               callback(new ExerciseStats(exerciseID, rows.rows.item(0).Name,rows.rows.item(0).averageNumberOfReps, rows.rows.item(0).averageNumberOfSets, rows.rows.item(0).averageWeight))
           }
        })
    })
}

export function  getAllExerciseStats(callback){
   // console.log("sqllog_method_getAllExerciseStats")
    db.transaction(tx => {
        tx.executeSql("select DISTINCT exerciseID from CompletedExercises;", [], (_, rows) => {
           // console.log("sqllog_method_getAllExerciseStats_distenctExerciseIDs",rows.rows)
            let listOfAverages = []
            for(let i = 0; i<rows.rows.length; i++){
                if(i == rows.rows.length-1){
                    getAverageMetricsForExercise(rows.rows.item(i).exerciseId,function (result){
                        //console.log("sqllog_method_getAllExerciseStats_i_result",i,"   ",result)
                        listOfAverages.push(result)
                        if(callback){
                            //console.log("sqllog_method_getAllExerciseStats_result",listOfAverages)
                            callback(listOfAverages)
                        }
                    })
                }else{
                    getAverageMetricsForExercise(rows.rows.item(i).exerciseId,function (result){
                        //console.log("sqllog_method_getAllExerciseStats_i_result",i,"   ",result)
                        listOfAverages.push(result)
                    })
                }
            }
        })
    })
}
