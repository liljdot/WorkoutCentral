import { Workout } from "../types"

export type WorkoutFormStateType  = {
    title: string
    load: number
    reps: number
}

export type WorkoutsActions = {type: "ADD_WORKOUT", payload: Workout}
| {type: "DELETE_WORKOUT", payload: string}
| {type: "SET_ALL_WORKOUTS", payload: Workout[]}