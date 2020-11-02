/*
CREATE table if not exists CompletedWorkouts(ID INTEGER PRIMARY KEY AUTOINCREMENT, date date not null)
 */

import {db} from "../App";
import {
    addMultipleCompleteExercisesToCompleteWorkout,
    Exercise,
    ExerciseWithinRoutine,
    getCompletedExercisesForWorkout
} from "./Exercise";

export class CompletedWorkout{
    constructor(ID, date, completedExercises) {
        this.ID = ID
        this.date = date
        this.completedExercises = completedExercises
    }
}

//tested
export function getMapOfCompleteWorkoutIDsToDates(callback){
    db.transaction(tx => {
        tx.executeSql("select * from CompletedWorkouts;", [], (_, rows) => {
            //console.log("sqllog_method_getExerciseFromRoutine_rows",rows.rows)
            let tempWorkouts = new Map()


            for (let i = 0; i < rows.rows.length; i++) {
                //console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempWorkouts.set(rows.rows.item(i).ID,rows.rows.item(i).date)
            }
            //tempWorkouts.sort(((a: CompletedWorkout, b: CompletedWorkout) => a.ID - b.ID))
            if(callback != null){
                callback(tempWorkouts)
            }
        })
    })
}

export function getAllCompleteWorkoutsWithoutExercises(callback){
    db.transaction(tx => {
        tx.executeSql("select * from CompletedWorkouts;", [], (_, rows) => {
            //console.log("sqllog_method_getCompleteWorkoutsWithoutExercises_rows",rows.rows)
            let tempWorkouts = []


            for (let i = 0; i < rows.rows.length; i++) {
                //console.log("sqllog_method_getCompleteWorkoutsWithoutExercises_rows_individually",rows.rows.item(i))
                tempWorkouts.push(new CompletedWorkout(rows.rows.item(i).ID,rows.rows.item(i).date))
            }

            if(callback != null){
                callback(tempWorkouts)
            }
        })
    })
}

export function getCompleteWorkout(workoutID, callback){
    //console.log("sqllog_method_getCompleteWorkout_rows",workoutID)
    db.transaction(tx => {
        tx.executeSql("select * from CompletedWorkouts where ID = "+workoutID+";", [], (_, rows) => {
            //console.log("sqllog_method_getCompleteWorkoutsWithoutExercises_rows",rows.rows)
            let temp = rows.rows.item(0)
            let workout = new CompletedWorkout(temp.ID, temp.date, null)
            getCompletedExercisesForWorkout(workoutID, function (res){
                workout.completedExercises = res
                callback(workout)
            })
        })
    })
}

//CompletedWorkouts(ID INTEGER PRIMARY KEY AUTOINCREMENT, date date not null)
export function saveCompleteWorkout(completeWorkout:CompletedWorkout, callback){
    db.transaction(tx =>{
        tx.executeSql("insert into CompletedWorkouts(date) values('" + completeWorkout.date+"');",[],(_,rows) =>{
            //console.log("sqllog_method_saveCompleteWorkout")
            db.transaction(tx =>{
                tx.executeSql("select Max(ID) as ID from CompletedWorkouts;" ,[],(_,rows) =>{
                    //console.log("sqllog_method_saveCompleteWorkout",rows.rows.item(0).ID)
                    completeWorkout.ID = rows.rows.item(0).ID
                    addMultipleCompleteExercisesToCompleteWorkout(completeWorkout,function () {
                        if (callback != null) {
                            callback()
                        }
                    })
                })
            })
        })
    })
}

