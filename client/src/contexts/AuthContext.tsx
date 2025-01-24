import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthActions, authInitialState, authReducer, AuthState } from "../reducers/authReducer";
import useGetHost from "../hooks/useGetHost";
import { useLogout } from "../hooks/useLogout";
import useGetUser from "../hooks/useGetUser";

export type User = {
    email: string,
    id: string
} | null

interface Props {
    children: ReactNode
}

export const authContext = createContext<{ authState: AuthState, authDispatch: React.Dispatch<AuthActions> } | null>(null)



const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const host = useGetHost()
    const { getUser } = useGetUser()
    const [authState, authDispatch] = useReducer(authReducer, authInitialState)

    console.log("Auth Context State:", authState)

    useEffect(() => {
        let userResponse: User = null

        getUser(`http://${host}/api/user`)
            .then(res => userResponse = res.data.user)
            .catch(e => { console.log(e.message); userResponse = e.data.user })
            .finally(() => {authDispatch({ type: "SET_USER", payload: userResponse })})
    }, [])

    return (
        <authContext.Provider value={{ authState, authDispatch }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider