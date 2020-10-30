

import {
    addExercisesToRoutine,
    addExerciseToRoutine,
    createNewExerciseFromExercise,
    deleteExerciseById, deleteExerciseFromRoutine,
    Exercise, ExerciseWithinRoutine, getAllCompleteExerciseBySpecificExerciseID,
    getAllExercises, getAllExercisesWithinRoutines,
    getExerciseFromRoutine
} from "../Classes/Exercise";
import {createDummyData} from "../StartUpSQL";
import {addNewRoutine, getAllRoutinesWithOutExercises, Routine} from "../Classes/Routine";
import {
    getMapOfCompleteWorkoutIDsToDates
} from "../Classes/Workout";

/*
all of the test for routines

 */

function testAddNewRoutine(callback){
    console.log("sqllog_test_AddNewRoutine","the test has begun")
    let tE = [new ExerciseWithinRoutine(1,1,1),new ExerciseWithinRoutine(2,1,2)]
    let tR =new Routine(null,'test adding new routine',4,tE)
    addNewRoutine(tR,function (){
        getAllRoutinesWithOutExercises(function (result){
            console.log("sqllog_test_AddNewRoutine_result",result)
            getAllExercisesWithinRoutines( function (result2){
                console.log("sqllog_test_AddNewRoutine_result",result2)
                if(callback != null){
                    callback()
                }
            })
        })
    })
}


function testGetAllRoutinesWithOutExercises(callback){
    //console.log("sqllog_test_GetAllRoutinesWithOutExercises","the test has begun")
    getAllRoutinesWithOutExercises(function(result){
        //console.log("sqllog_test_GetAllRoutinesWithOutExercises_result", result)

        if(result.length == 1){
            let msg = "sqllog_test_GetAllRoutinesWithOutExercises_result testGetAllRoutinesWithOutExercises method passed"
            colorTrace(msg,'green')
        }else{
            colorTrace("sqllog_test_GetAllRoutinesWithOutExercises_result testGetAllRoutinesWithOutExercises method failed resulting array this should match the dummy data array that is 1 long = "+result.length,'red')
        }


        if(callback != null){
            callback()
        }
    })
}


function testGetExercisesFromRoutine1(callback){
    //console.log("sqllog_test_gettingExercisesFromRoutine1","the test has begun")
    getExerciseFromRoutine(1, function(result) {
        //console.log("test_gettingExercisesFromRoutine1_result",result)

        if(result.length == 3){
            colorTrace("sqllog_test_gettingExercisesFromRoutine1_result testGetExercisesFromRoutine1 method passed",'green')
        }else{
            colorTrace("sqllog_test_gettingExercisesFromRoutine1_result testGetExercisesFromRoutine1 method failed resulting array this should match the dummy data array that is 3 long = "+result.length,'red')
        }
        if(callback != null){
            callback()
        }
    })
}

function testAddExerciseToRoutine(callback){
    //console.log("sqllog_test_AddExerciseToRoutine","the test has begun")
    let data = new ExerciseWithinRoutine(1,4,1,5)
        addExerciseToRoutine(1,data, function(){
         //   console.log("sqllog_test_AddExerciseToRoutine","add exercise")
            getAllExercisesWithinRoutines(function (result){
                //console.log("sqllog_test_AddExerciseToRoutine_ressult",result)


                if(result.length == 4){
                    colorTrace("sqllog_test_AddExerciseToRoutine_ressult testAddExerciseToRoutine method passed",'green')
                }else{
                    colorTrace("sqllog_test_AddExerciseToRoutine_ressult testAddExerciseToRoutine method failed the new data doesnt match the added data",'red')
                }


                if(callback != null){
                    callback()
                }
            })
        })
}

function testAddMultipleExercisesToRoutine(callback){
    console.log("sqllog_test_AddMultipleExercisesToRoutine","the test has begun")
    let data = [new ExerciseWithinRoutine(1,4,2,5),new ExerciseWithinRoutine(1,1,2,5)]
    addExercisesToRoutine(2,data, function(){
        //   console.log("sqllog_test_AddMultipleExercisesToRoutine","add exercise")
        getAllExercisesWithinRoutines(function (result){
            console.log("sqllog_test_AddMultipleExercisesToRoutine_ressult",result)


            if(result.length == 4){
                colorTrace("sqllog_test_AddMultipleExercisesToRoutine_ressult testAddExerciseToRoutine method passed",'green')
            }else{
                colorTrace("sqllog_test_AddMultipleExercisesToRoutine_ressult testAddExerciseToRoutine method failed the new data doesnt match the added data",'red')
            }


            if(callback != null){
                callback()
            }
        })
    })



}



function testDeleteExerciseFromRoutine(callback){
    //console.log("sqllog_test_DeleteExerciseFromRoutine","the test has begun")
    getAllExercisesWithinRoutines(function (result){
        let temp = result.length
        //console.log("sqllog_test_DeleteExerciseFromRoutine_result",result)
        deleteExerciseFromRoutine(result[1],function (){

            getAllExercisesWithinRoutines(function (result){
                //console.log("sqllog_test_DeleteExerciseFromRoutine_result",result)
                if(result.length == temp-1){
                    colorTrace("sqllog_test_DeleteExerciseFromRoutine_result testDeleteExerciseFromRoutine method passed",'green')
                }else{
                    colorTrace("sqllog_test_DeleteExerciseFromRoutine_result testDeleteExerciseFromRoutine method failed length init = "+temp+" after call = "+ result.length+" should be one less than init",'red')
                }
                if(callback != null){
                    callback()
                }

            })
        })
    })
}


/*
all the test for exercises

 */

function testGetAllExercises(callback){
    //console.log("sqllog_test_GetAllExercises","the testGetAllExercises test has begun")
    getAllExercises(function (result){
        //console.log("sqllog_test_testGetAllExercises_results",result)

        if(result.length == 3){
            colorTrace("sqllog_test_testGetAllExercises_results testGetAllExercises method passed",'green')
        }else{
            colorTrace("sqllog_test_testGetAllExercises_results testGetAllExercises method failed resulting array this should match the dummy data array that is 3 long = "+result.length,'red')
        }
        if(callback != null){
            callback()
        }
    })
}

function testCreateNewExerciseFromExercise(callback){
    //console.log("sqllog_test_CreateNewExerciseFromExercise","the testGetAllExercises test has begun")
    createNewExerciseFromExercise(new Exercise(1,"test exercise","this is a test val", false), function (){
        getAllExercises(function (result){
            //console.log("sqllog_test_CreateNewExerciseFromExercise_results",result[result.length-1])

            if(result[result.length-1].name = "test exercise"){
                colorTrace("sqllog_test_CreateNewExerciseFromExercise_results CreateNewExerciseFromExercise method passed",'green')
            }else{
                colorTrace("sqllog_test_CreateNewExerciseFromExercise_results CreateNewExerciseFromExercise method failed resulting array this should match the dummy data array that is 3 long = "+result.length,'red')
            }

            if(callback != null){
                callback()
            }
        })
    })
}


function testDeleteExerciseById(callback){
   ///console.log("sqllog_test_DeleteExerciseById","the testDeleteExerciseById test has begun")
    let temp = null

    getAllExercises(function (result){
        temp = result.length
        deleteExerciseById(result.length-1,function (){

            getAllExercises(function (result){

                if(result.length == temp-1){
                    colorTrace("sqllog_test_DeleteExerciseById_results testDeleteExerciseById method passed",'green')
                }else{
                    colorTrace("sqllog_test_DeleteExerciseById_results testDeleteExerciseById method failed length init = "+temp+" after call = "+ result.length+" should be one less than init",'red')
                }
                if(callback != null){
                    callback()
                }
            })
        })
    })
}




/*
completed workout test

 */

function testGetListOfWorkoutsWithoutExercises(callback){
    //console.log("sqllog_test_GetListOfWorkoutsWithoutExercises","the testGetListOfWorkoutsWithoutExercises test has begun")
    getMapOfCompleteWorkoutIDsToDates(function (result ){
        //console.log("sqllog_test_GetListOfWorkoutsWithoutExercises_result",result)

        if(result.size == 2){
            colorTrace("sqllog_test_GetListOfWorkoutsWithoutExercises_results testGetListOfWorkoutsWithoutExercises method length test passed",'green')
        }else{
            colorTrace("sqllog_test_GetListOfWorkoutsWithoutExercises_results testGetListOfWorkoutsWithoutExercises method failed length should be 2 is = "+ result.size,'red')
        }

        if(callback != null){
            callback()
        }
    })
}


/*
complete exercise test
 */

function testGetAllCompleteExerciseBySpecificExerciseID(callback){
    //console.log("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID","the testGetAllCompleteExerciseBySpecificExerciseID test has begun")

    getAllCompleteExerciseBySpecificExerciseID(1 , function (result) {
        //console.log("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result",result)


        if(result.length == 3){
            colorTrace("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result testGetAllCompleteExerciseBySpecificExerciseID method  length test passed",'green')
        }else{
            colorTrace("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result testGetAllCompleteExerciseBySpecificExerciseID method failed length should be 3 is = "+ result.length,'red')
        }

        if(callback != null){
            callback()
        }

    })
}


//actuall testing

function exerciseTests(callback){
    testGetAllExercises(function (){
        testCreateNewExerciseFromExercise( function (){
            testDeleteExerciseById(function (){
                    callback()
            })
        })
    })
}

function routineTests(callback){
    testGetAllRoutinesWithOutExercises(function(){
        testGetExercisesFromRoutine1(function () {
            testAddExerciseToRoutine(function (){
                testDeleteExerciseFromRoutine(function (){
                    testAddMultipleExercisesToRoutine(function (){
                        // testAddNewRoutine(function (){
                        callback()
                        // })
                    })

                })
            })
        })
    })
}

function completeWorkoutsTest(callback){
    testGetListOfWorkoutsWithoutExercises(callback)
}

function completeExerciseTest(callback) {
    testGetAllCompleteExerciseBySpecificExerciseID(callback)
}



export function runSQLTest(){
    createDummyData(function (){
        exerciseTests(function (){
            routineTests(function (){
                completeWorkoutsTest(function (){
                    completeExerciseTest()
                })
            })
        })
    })
}

function colorTrace(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}






