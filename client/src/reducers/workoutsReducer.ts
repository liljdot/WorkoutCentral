import { Reducer } from "react";
import { Workout } from "../types";
import { WorkoutsActions } from "./types";

export const workoutsInitialState: Workout[] = []

export const workoutsReducer: Reducer<Workout[], WorkoutsActions> = (state, action) => {
    switch (action.type) {
        case "ADD_WORKOUT":
            return [action.payload, ...state]
        case "SET_ALL_WORKOUTS":
            return action.payload
        case "DELETE_WORKOUT":
            return state.filter(workout => workout.id != action.payload)
        default:
            return [...state]
    }
}