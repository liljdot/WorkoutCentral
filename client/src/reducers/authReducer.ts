import { User } from "../contexts/AuthContext"

export type AuthState = {
    user: User,
    userData?: any
}

export type AuthActions = { type: "LOGIN", payload: User }
    | { type: "LOGOUT", payload: "" }
    | { type: "SET_USER", payload: User }

export const authInitialState = {
    user: null
}

export const authReducer: React.Reducer<AuthState, AuthActions> = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return authInitialState
        case "SET_USER":
            return { user: action.payload }
        default:
            return state
    }
}