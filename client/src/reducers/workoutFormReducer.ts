import { Reducer } from "react";
import { WorkoutFormStateType } from "./types";

export type WorkoutFormActions = {type: "SET_TITLE", payload: string}
| {type: "SET_LOAD", payload: number}
| {type: "SET_REPS", payload: number}
| {type: "RESET_ALL_FIELDS", payload: ""}

export const workoutFormInitialState: WorkoutFormStateType = {
    title: "",
    load: 0,
    reps: 0
}

export const workoutFormReducer: Reducer<WorkoutFormStateType, WorkoutFormActions> = (state, action) => {
    switch(action.type) {
        case "SET_TITLE":
            return {...state, title: action.payload}
        case "SET_LOAD":
            return {...state, load: action.payload}
        case "SET_REPS":
            return {...state, reps: action.payload}
        case "RESET_ALL_FIELDS":
            return {...workoutFormInitialState}
        default:
            return state
    }
}