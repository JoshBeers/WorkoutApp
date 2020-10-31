

import {
    addExerciseToRoutine, addMultipleExercisesToRoutine, CompleteExercise,
    createNewExerciseFromExercise,
    deleteExerciseById, deleteExerciseFromRoutine, deleteExercisesUnderARoutine,
    Exercise, ExerciseWithinRoutine, getAllCompleteExerciseBySpecificExerciseID,
    getAllExercises, getAllExercisesWithinRoutines, getCompletedExercisesForWorkout,
    getExerciseFromRoutine, saveExerciseFromCompletedExercises
} from "../Classes/Exercise";
import {createDummyData} from "../StartUpSQL";
import {
    addNewRoutine, deleteRoutine,
    getAllRoutinesWithOutExercises, getSpecificRoutine,
    Routine,
    updateRoutine
} from "../Classes/Routine";
import {
    getAllCompleteWorkoutsWithoutExercises, getCompleteWorkout,
    getMapOfCompleteWorkoutIDsToDates
} from "../Classes/Workout";

/*
all of the test for routines

 */

function testAddNewRoutine(callback){
    console.log("sqllog_test_AddNewRoutine","the test has begun")
    let tE = [new ExerciseWithinRoutine(1,1,1,1),new ExerciseWithinRoutine(2,1,2,5)]
    let tR =new Routine(null,'test adding new routine',4,tE)

    getAllRoutinesWithOutExercises(function (result){
        let originalRoutineList = result
        getAllExercisesWithinRoutines(function (re){
            let originalExercises = re
            addNewRoutine(tR,function (){
                getAllRoutinesWithOutExercises(function (result){
                    let testRoutines = result
                    //console.log("sqllog_test_AddNewRoutine_result",result)
                    getAllExercisesWithinRoutines( function (finalExercises){
                        //console.log("sqllog_test_AddNewRoutine_result",result2)

                        if(originalRoutineList.length+1 == testRoutines.length){
                            colorTrace("sqllog_test_AddNewRoutine_result adding new routine routine list length test passed",'green')
                        }else{
                            colorTrace("sqllog_test_AddNewRoutine_result adding new routine routine list length test failed length expected = "+originalRoutineList.length +"result = "+testRoutines.length,'red')
                        }

                        if(originalExercises.length+2 == finalExercises.length){
                            colorTrace("sqllog_test_AddNewRoutine_result adding new routine exercise list length test passed",'green')
                        }else{
                            colorTrace("sqllog_test_AddNewRoutine_result adding new routine exercise list length test faied length expected = "+originalExercises.length+2 +"result = "+finalExercises.length,'red')
                        }


                            if(callback != null){
                                callback()
                            }
                    })
                })
            })

        })
    })

}

function testGetAllRoutinesWithOutExercises(callback){
    console.log("sqllog_test_GetAllRoutinesWithOutExercises","the test has begun")
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
    console.log("sqllog_test_gettingExercisesFromRoutine1","the test has begun")
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
    console.log("sqllog_test_AddExerciseToRoutine","the test has begun")
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


    getAllExercisesWithinRoutines(function (result){

        let temp = result
        addMultipleExercisesToRoutine(2,data, function(){
               //console.log("sqllog_test_AddMultipleExercisesToRoutine","add exercise")
            getAllExercisesWithinRoutines(function (result){
                //console.log("sqllog_test_AddMultipleExercisesToRoutine_ressult",temp.length)


                if(result.length == temp.length+2){
                    colorTrace("sqllog_test_AddMultipleExercisesToRoutine_ressult testAddExerciseToRoutine method passed",'green')
                }else{
                    colorTrace("sqllog_test_AddMultipleExercisesToRoutine_ressult testAddExerciseToRoutine method failed the new data doesnt match the added data",'red')
                }


                if(callback != null){
                    callback()
                }
            })
        })
    })
}

function testDeleteExerciseFromRoutine(callback){
    console.log("sqllog_test_DeleteExerciseFromRoutine","the test has begun")
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

function testDeleteExercisesFromSpecificRoutine(callback){
    console.log("sqllog_test_DeleteEcercisesFromSpecificRoutine","the test has begun")
    getAllRoutinesWithOutExercises(function (res){
        let routineIdToDelete = res[0].id
        routineIdToDelete.name = "test updating"
        console.log("sqllog_test_DeleteEcercisesFromSpecificRoutine_result",res[0].id)
        deleteExercisesUnderARoutine(routineIdToDelete,function (){
            getExerciseFromRoutine(routineIdToDelete, function (finalList){
                console.log("sqllog_test_DeleteEcercisesFromSpecificRoutine_result",finalList)
                if(finalList.length == 0){
                    colorTrace("sqllog_test_DeleteEcercisesFromSpecificRoutine testDeleteEcercisesFromSpecificRoutine method passed",'green')
                }else{
                    colorTrace("sqllog_test_DeleteEcercisesFromSpecificRoutine testDeleteEcercisesFromSpecificRoutine method failed list returned was not empty its length was = "+finalList.length,'red')
                }
                if(callback != null){
                    callback()
                }
            })
        })
    })
}

function testUpdatingRoutine(callback){
    console.log("sqllog_test_UpdatingRoutine","test has begun")
    createDummyData(function (){
        let tE = [new ExerciseWithinRoutine(1,1,1,1),new ExerciseWithinRoutine(2,1,1,1)]
        getAllRoutinesWithOutExercises(function (res){
            let routine =res[0]
            routine.exercises = tE
            routine.placeInOrder = 45
            routine.name = "testing updating routine"
            updateRoutine(routine, function (){
                getExerciseFromRoutine(routine.id,function (finalListOfExercises){
                    console.log("sqllog_test_UpdatingRoutine_result",finalListOfExercises)
                    let fLOE= finalListOfExercises
                    getAllRoutinesWithOutExercises(function (fLOR){
                        console.log("sqllog_test_UpdatingRoutine_result",fLOR)



                        if(fLOR[0].name == "testing updating routine"){
                            colorTrace("ssqllog_test_UpdatingRoutine_result testUpdatingRoutine routine name test passed",'green')
                        }else{
                            colorTrace("ssqllog_test_UpdatingRoutine_result testUpdatingRoutine method failed expected routine name =  testing updating routine fount = "+fLOR[0].name,'red')
                        }

                        if(fLOE.length == 2){
                            colorTrace("ssqllog_test_UpdatingRoutine_result testUpdatingRoutine exercise length passed",'green')
                        }else{
                            colorTrace("ssqllog_test_UpdatingRoutine_result testUpdatingRoutine exercise length failed",'green')
                        }


                        if(callback != null){
                            callback()
                        }

                    })

                })
            })
        })
    })
}

function testGetSpecificRoutine(callback){
    console.log("sqllog_test_GetSpecificRoutine","test has begun")
    createDummyData(function (){
        getSpecificRoutine(1, function (routine:Routine){
            console.log("sqllog_test_GetSpecificRoutine_result",routine)

            if(routine.name == "main routine" && routine.exercises.length == 3){
                colorTrace("sqllog_test_GetSpecificRoutine_restult geting routine name and exercuse lenght test passed",'green')
            }else{
                colorTrace("sqllog_test_GetSpecificRoutine_restult geting routine name and exercuse lenght test failed",'red')
            }
            if(callback != null){
                callback()
            }
        })
    })
}




/*
all the test for exercises

 */

function testGetAllExercises(callback){
    console.log("sqllog_test_GetAllExercises","the testGetAllExercises test has begun")
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
    console.log("sqllog_test_CreateNewExerciseFromExercise","the testGetAllExercises test has begun")
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
   console.log("sqllog_test_DeleteExerciseById","the testDeleteExerciseById test has begun")
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
    console.log("sqllog_test_GetListOfWorkoutsWithoutExercises","the testGetListOfWorkoutsWithoutExercises test has begun")
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

function testGetCompleteWorkoutsWithoutExercises(callback){
    console.log("sqllog_test_GetCompleteWorkoutsWithoutExercises"," test has begun")
    createDummyData(function (){
        getAllCompleteWorkoutsWithoutExercises(function (res){
            //console.log("sqllog_test_GetCompleteWorkoutsWithoutExercises_result",res)

            if(res.length ==2){
                colorTrace("sqllog_test_GetCompleteWorkoutsWithoutExercises_result method length test passed",'green')
            }else {
                colorTrace("sqllog_test_GetCompleteWorkoutsWithoutExercises_result method length test failed",'red')
            }
            if(callback != null){
                callback()
            }

        })
    })
}

function testGetCompletedExercisesForWorkout(callback){
    console.log("sqllog_test_GetCompletedExercisesForWorkout"," test has begun")
    createDummyData(function (){
        getCompletedExercisesForWorkout(1,function (res){
            console.log("sqllog_test_GetCompletedExercisesForWorkout_result",res)

            if(res.length ==4){
                colorTrace("sqllog_test_GetCompletedExercisesForWorkout_result method length test passed",'green')
            }else {
                colorTrace("sqllog_test_GetCompletedExercisesForWorkout_result method length test failed",'red')
            }
            if(callback != null){
                callback()
            }

        })
    })
}

function testGetCompleteWorkout(callback){
    console.log("sqllog_test_GetCompleteWorkout"," test has begun")
    createDummyData(function (){
        getCompleteWorkout(1,function (response){
            //console.log("sqllog_test_GetCompleteWorkout_response",response)

            if(response.date == "2020-10-20"){
                colorTrace("sqllog_test_GetCompleteWorkout_response method date test passed",'green')
            }else{
                colorTrace("sqllog_test_GetCompleteWorkout_response method date test failed",'red')
            }

            if(response.completedExercises.length == 4){
                colorTrace("sqllog_test_GetCompleteWorkout_response method exercise list length test passed",'green')
            }else{
                colorTrace("sqllog_test_GetCompleteWorkout_response method exercise list length test failed",'red')
            }
            if(callback != null){
                callback()
            }
        })
    })
}

function testDeleteWorkout(callback){
    console.log("sqllog_test_DeleteWorkout"," test has begun")
    createDummyData(function (){
        deleteRoutine(new Routine(1), function () {
            getAllRoutinesWithOutExercises(function (result) {
                let routinList = result
                getExerciseFromRoutine(1,function (exerciseList){
                    //console.log("sqllog_test_DeleteWorkout_result",result)
                    if(routinList.length ==0 ){
                        colorTrace("sqllog_test_DeleteWorkout_result method routine list length test passed",'green')
                    }else{
                        colorTrace("sqllog_test_DeleteWorkout_result method routine list length test failed",'red')
                    }

                    if(exerciseList.length ==0 ){
                        colorTrace("sqllog_test_DeleteWorkout_result method exercise list length test passed",'green')
                    }else{
                        colorTrace("sqllog_test_DeleteWorkout_result method exercise list length test failed",'red')
                    }
                    if(callback != null){
                        callback()
                    }
                })
            })
        })
    })
}

function testSaveExerciseFromCompletedExercises(callback){
    console.log("sqllog_test_SaveExerciseFromCompletedExercises"," test has begun")
    createDummyData(function () {
        saveExerciseFromCompletedExercises(new CompleteExercise(1,1,3,1,1,1,"2020-01-01"),function () {
            //console.log("sqllog_test_SaveExerciseFromCompletedExercises")
            getCompletedExercisesForWorkout(3, function (result) {
                console.log("sqllog_test_SaveExerciseFromCompletedExercises_result",result)

                if(result.length == 1){
                    colorTrace("sqllog_test_SaveExerciseFromCompletedExercises_result method exercise list length test passed",'green')
                }else{
                    colorTrace("sqllog_test_SaveExerciseFromCompletedExercises_result method exercise list length test passed",'red')
                }
                if(callback != null){
                    callback()
                }
            })
        })
    })
}



/*
complete exercise test
 */

function testGetAllCompleteExerciseBySpecificExerciseID(callback){
    console.log("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID","the test has begun")

    getAllCompleteExerciseBySpecificExerciseID(1 , function (result) {
        //console.log("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result",result)


        if(result.length == 3){
            colorTrace("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result  method  length test passed",'green')
        }else{
            colorTrace("sqllog_test_GetAllCompleteExerciseBySpecificExerciseID_result  method failed length should be 3 is = "+ result.length,'red')
        }

        if(callback != null){
            callback()
        }

    })
}

//actuall testing
/*
test 1-3
 */

function exerciseTests(callback){
    testGetAllExercises(function (){
        testCreateNewExerciseFromExercise( function (){
            testDeleteExerciseById(function (){
                createDummyData(callback)
                //callback()
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
                         testAddNewRoutine(function (){
                             testDeleteExercisesFromSpecificRoutine(function (){
                                 testUpdatingRoutine(function (){
                                     testGetSpecificRoutine(function (){
                                         createDummyData(function (){
                                             testDeleteWorkout(callback)
                                         })
                                       //  callback()
                                     })
                                 })
                             })
                         })
                    })
                })
            })
        })
    })
}

function completeWorkoutsTest(callback){
    testGetListOfWorkoutsWithoutExercises(function (){
        testGetCompleteWorkoutsWithoutExercises(function (){
            testGetCompletedExercisesForWorkout(function (){
                testGetCompleteWorkout(callback)
            })
        })
    })
}

function completeExerciseTest(callback) {
    testGetAllCompleteExerciseBySpecificExerciseID(function (){
        testSaveExerciseFromCompletedExercises(callback)
    })
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






