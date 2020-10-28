

import {createNewExerciseFromExercise, Exercise, getAllExercises, getExerciseFromRoutine} from "../Classes/Exercise";
import {createDummyData} from "../StartUpSQL";

function testGetExercisesFromRoutine1(callback){
    console.log("sqllog_test_gettingExercisesFromRoutine1","the test has begun")
    getExerciseFromRoutine(1, function(result) {
        //console.log("test_gettingExercisesFromRoutine1_result",result)

        if(result.length == 3){
            console.log("sqllog_test_gettingExercisesFromRoutine1_result","testGetExercisesFromRoutine1 method passed")
        }else{
            console.log("sqllog_test_gettingExercisesFromRoutine1_result","testGetExercisesFromRoutine1 method failed resulting array this should match the dummy data array that is 3 long = "+result.length)
        }
        if(callback != null){
            callback()
        }
    })
}

function testGetAllExercises(callback){
    console.log("sqllog_test_GetAllExercises","the testGetAllExercises test has begun")
    getAllExercises(function (result){
        //console.log("sqllog_test_testGetAllExercises_results",result)

        if(result.length == 3){
            console.log("sqllog_test_testGetAllExercises_results","testGetAllExercises method passed")
        }else{
            console.log("sqllog_test_testGetAllExercises_results","testGetAllExercises method failed resulting array this should match the dummy data array that is 3 long = "+result.length)
        }
        if(callback != null){
            callback()
        }
    })
}

function testCreateNewExerciseFromExercise(callback){
    console.log("sqllog_test_CreateNewExerciseFromExercise","the testGetAllExercises test has begun")
    createNewExerciseFromExercise(new Exercise(1,"test exercise","this is a test val", false), function (){
        getAllExercises(function (result){
            //console.log("sqllog_test_CreateNewExerciseFromExercise_results",result[result.length-1])

            if(result[result.length-1].name = "test exercise"){
                console.log("sqllog_test_testGetAllExercises_results","testGetAllExercises method passed")
            }else{
                console.log("sqllog_test_testGetAllExercises_results","testGetAllExercises method failed resulting array this should match the dummy data array that is 3 long = "+result.length)
            }

            if(callback != null){
                callback()
            }
        })
    })
}


export function runSQLTest(){
    createDummyData(function (){
        testGetExercisesFromRoutine1(function () {
            testGetAllExercises(function (){
                testCreateNewExerciseFromExercise()
            })
        })
    })

}






