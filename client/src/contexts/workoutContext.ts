import { createContext } from "react";
import { WorkoutFormStateType } from "../reducers/types";
import { WorkoutFormActions } from "../reducers/workoutFormReducer";

export interface WorkoutContextType {
    workoutFormState: WorkoutFormStateType
    workoutFormDispatch: React.Dispatch<WorkoutFormActions>
}

export const workoutContext = createContext<WorkoutContextType | undefined>(undefined)