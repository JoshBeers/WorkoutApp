import {
    addMultipleExercisesToRoutine, deleteExercisesUnderARoutine,
    ExerciseWithinRoutine,
    getExerciseFromRoutine
} from "./Exercise";
import * as SQLite from "expo-sqlite";
import {db} from "../App";
import {call} from "react-native-reanimated";


export class Routine{
    constructor(id, name,placeInOrder,exercises:ExerciseWithinRoutine[]) {
        this.id = id
        this.name= name
        this.placeInOrder =placeInOrder
        this.exercises = exercises
    }
}

export function addNewRoutine(routine:Routine,callback){
    //adds routine
    db.transaction(tx =>{
        tx.executeSql("insert into routines(name,placeOnList) values('"+routine.name+"',"+routine.placeInOrder+");",[],function(){

            db.transaction(tx =>{
                tx.executeSql("select Max(ID) as ID from routines;",[],(_,rows)=>{
                    //console.log("sqllog_method_addNewRoutiney",rows.rows.item(0))
                    addMultipleExercisesToRoutine(rows.rows.item(0).ID,routine.exercises, callback)
                })
            })
        })
    })
}


export function getSpecificRoutine(routineID,callback){
    let tempRoutine = new Routine()
    db.transaction(tx =>{
        tx.executeSql("select * from routines where ID ="+ routineID +";",[],(_,rows) =>{
            tempRoutine.id = rows.rows[0].ID
            tempRoutine.name = rows.rows[0].name
            tempRoutine.placeInOrder = rows.rows[0].placeOnList
            getExerciseFromRoutine(routineID,function (res) {
                tempRoutine.exercises = res
                if(callback != null){
                    callback(tempRoutine)
                }
            })

        })
    })

}

export function getAllRoutinesWithOutExercises(callback){
    db.transaction(tx =>{
        tx.executeSql("select * from routines;",[],(_,rows) =>{
            let tempRoutines = []


            for(let i = 0;i<rows.rows.length;i++){
               // console.log("sqllog_method_getExerciseFromRoutine_rows_individually",rows.rows.item(i))
                tempRoutines.push(new Routine(rows.rows.item(i).ID,rows.rows.item(i).name,rows.rows.item(i).placeOnList, []))
            }
           // tempRoutines.sort(((a:ExerciseWithinRoutine, b:ExerciseWithinRoutine) => a.placeInOrder-b.placeInOrder))
            if(callback != null){
                callback(tempRoutines)
            }

        })
    })
}

//s routines(ID integer primary key AUTOINCREMENT, name varchar(30) not null,placeOnList integer);
export function updateRoutine(routine:Routine, callback){
    deleteExercisesUnderARoutine(routine.id, function (){
        console.log("sqllog_method_updateRoutine",routine.name)
        db.transaction(tx =>{
            tx.executeSql("update routines set name = '"+routine.name+"',placeOnList = "+routine.placeInOrder+" where ID = "+routine.id+";",[],(_,rows) =>{
                addMultipleExercisesToRoutine(routine.id,routine.exercises,function () {
                    if(callback != null){
                        callback()
                    }
                })
            })
        })


    })
}



