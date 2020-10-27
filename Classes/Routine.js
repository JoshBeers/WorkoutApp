import {addExerciseToRoutine, ExerciseWithinRoutine, getExerciseFromRoutine} from "./Exercise";
import * as SQLite from "expo-sqlite";
import {db} from "../App";

export class Routine{
    constructor(name,placeInOrder,exercises:ExerciseWithinRoutine[]) {
        this.name= name
        this.placeInOrder =placeInOrder
        this.exercises = exercises
    }
}

export function addNewRoutine(routine:Routine){
    //adds routine
    db.transaction(tx =>{
        tx.executeSql("insert into routines(name,placeOnList) values('"+routine.name+"',"+routine.placeInOrder+");",)
    })

    //gets the id of the last added routine
    let routineId = null;
    db.transaction(tx =>{
        tx.executeSql("select MAX(ID) from routines;",[],(_,rows) =>{
            console.log("sqllog_routines", rows.rows)
            routineId = rows.rows[0]
        })
    })

    if(routineId==null){
        throw  new Error("no routines in db")
    }

    routine.exercises.forEach( exercise => addExerciseToRoutine(routineId, exercise))
}

export function getSpecificRoutine(routineID){
    let tempRoutine = new Routine()
    db.transaction(tx =>{
        tx.executeSql("select * from routines where ID ="+ routineID +";",[],(_,rows) =>{
            tempRoutine.name = rows.rows[0].name
            tempRoutine.placeInOrder = rows.rows[0].placeInOrder
        })
    })
    tempRoutine.exercises = getExerciseFromRoutine(routineID)
    return tempRoutine
}

