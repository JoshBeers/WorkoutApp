export const dumDumExercise = [
    {
        "exerciseID": 1,
        "name": "Quad Stretch",
        "description": "Lower body stretches that stretches your quads.",
        "doesUseWeight": false
    },
    {
        "exerciseID": 2,
        "name": "Treadmill",
        "description": "Stationary cardio device",
        "doesUseWeight": false
    },
    {
        "exerciseID": 3,
        "name": "Body Weight Squats",
        "description": "Lower body workout using body weight",
        "doesUseWeight": false
    },
    {
        "exerciseID": 4,
        "name": "Dumbbell Rows",
        "description": "Upper body workout using dumbbells.",
        "doesUseWeight": true
    },
    {
        "exerciseID": 5,
        "name": "Push Ups",
        "description": "Upper body body weight workout.",
        "doesUseWeight": false
    },
    {
        "exerciseID": 6,
        "name": "Barbell Lunges",
        "description": "Lower workout using dumbbells.",
        "doesUseWeight": true
    },
    {
        "exerciseID": 7,
        "name": "Deadlifts",
        "description": "Lower body workout using barbell.",
        "doesUseWeight": true
    },
    {
        "exerciseID": 8,
        "name": "Barbell Curls",
        "description": "Upper body workout using a barbell.",
        "doesUseWeight": true
    },
    {
        "exerciseID": 9,
        "name": "Seated Machine Trunk Rotations",
        "description": "Upper body core workout using a machine.",
        "doesUseWeight": true
    },
    {
        "exerciseID": 10,
        "name": "Leg Press",
        "description": "Lower body workout using a machine.",
        "doesUseWeight": true
    }
];
export const dumDumRoutines = [
    {
        "id": 0,
        "name": "My Basic Circuit",
        "placeInOrder": 2,
        "exercises": [
            {
                "exerciseID": 1,
                "routineID": 0,
                "placeInOrder": 1
            },
            {
                "exerciseID": 2,
                "routineID": 0,
                "placeInOrder": 2
            },
            {
                "exerciseID": 5,
                "routineID": 0,
                "placeInOrder": 3
            },
            {
                "exerciseID": 3,
                "routineID": 0,
                "placeInOrder": 4
            }
        ]
    },
    {
        "id": 1,
        "name": "Weights and More Weights",
        "placeInOrder": 1,
        "exercises": [
            {
                "exerciseID": 6,
                "routineID": 0,
                "placeInOrder": 1
            },
            {
                "exerciseID": 7,
                "routineID": 0,
                "placeInOrder": 2
            },
            {
                "exerciseID": 8,
                "routineID": 0,
                "placeInOrder": 3
            }
        ]
    }
];
