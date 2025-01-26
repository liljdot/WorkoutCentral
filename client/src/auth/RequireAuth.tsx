import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import useGetUser from "../hooks/useGetUser"
import useGetHost from "../hooks/useGetHost"
import { User } from "../contexts/AuthContext"
import { useLogout } from "../hooks/useLogout"
import { Outlet, Navigate } from "react-router-dom"


const RequireAuth: React.FC = () => {
    const { getUser } = useGetUser()
    const host = useGetHost()
    const { authState, authDispatch } = useAuthContext()
    const { user } = authState
    const { logout } = useLogout()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        let userResponse: User

        getUser(`http://${host}/api/user`)
            .then(res => userResponse = res.data.user)
            .catch(e => { console.log(e.message); userResponse = e.data?.user })
            .finally(() => {
                if (!user) {
                    authDispatch({ type: "SET_USER", payload: userResponse })
                    setIsLoading(false)
                    return
                }

                if (user.id != userResponse?.id) {
                    logout(`http://${host}/api/user/logout`)
                    setIsLoading(false)
                    return
                }

                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {isLoading ? <h1>...</h1> : !user ? <Navigate to={"/login"} /> : <Outlet />}
        </>
    )
}

export default RequireAuth