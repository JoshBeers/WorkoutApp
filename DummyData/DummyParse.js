import {Exercise, ExerciseWithinRoutine} from "../Classes/Exercise";
import {Routine} from "../Classes/Routine";

function getDummyExercises(){
    let dumDumExercises = new Map();
    let jsonArray = JSON.parse(fs.readFileSync("Exercise.json"));
    jsonArray.forEach((temp) => dumDumExercises.set(temp.exerciseID, new Exercise(temp.exerciseID, temp.name, temp.description, temp.doesUseWeight)));
    console.log(dumDumExercises)
    return dumDumExercises;
}

function getDummyRoutines(){
    let dumDumRoutines = [];
    let jsonArray = JSON.parse(fs.readFileSync("Routine.json"));
    for(let i = 0; i < jsonArray.length; i++){
        let tempWithin = [];
        jsonArray.exercises.forEach((temp) => tempWithin.push(new ExerciseWithinRoutine(temp.exerciseID, temp.routineId, temp.placeInOrder)));
        dumDumRoutines.push(new Routine(jsonArray.id, jsonArray.name, jsonArray.placeInOrder, tempWithin));
    }
    return dumDumRoutines;
}

export const dumDumExercise = getDummyExercises();
export const dumDumRoutines = getDummyRoutines();
