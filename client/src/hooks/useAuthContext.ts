import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import { AuthActions, AuthState } from "../reducers/authReducer";


export const useAuthContext: () => {
    authState: AuthState;
    authDispatch: React.Dispatch<AuthActions>;
} = () => {
    const context = useContext(authContext)

    if (!context) {
        throw new Error("useUserContext must be used inside UserContextProvider")
    }

    return context
}
