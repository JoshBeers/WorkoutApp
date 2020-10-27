

import {getExerciseFromRoutine} from "../Classes/Exercise";
import {createDummyData} from "../StartUpSQL";

function testGetExercisesFromRoutine1(){
    console.log("sqllog_test_gettingExercisesFromRoutine1","the test has begun")
    let v = null
    getExerciseFromRoutine(1, function(result) {
        if(result.lenth == 3){
            console.log("test_gettingExercisesFromRoutine1_result","testGetExercisesFromRoutine1 method passed")
        }else{
            console.log("test_gettingExercisesFromRoutine1_result","testGetExercisesFromRoutine1 method failed resulting array = "+result)
        }
    })
}



export function runSQLTest(){
    createDummyData(function (){
        testGetExercisesFromRoutine1()
    })

}






