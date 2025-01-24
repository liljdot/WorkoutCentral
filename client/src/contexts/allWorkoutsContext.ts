import { createContext } from "react";
import { Workout } from "../types";
import { WorkoutsActions } from "../reducers/types";

export const allWorkoutsContext = createContext<{workouts: Workout[], workoutsDispatch: React.Dispatch<WorkoutsActions>} | null>(null)