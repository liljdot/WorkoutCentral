import { useState } from "react"
import { rejectJson } from "./rejectJson"
import { useAuthContext } from "./useAuthContext"

type ErrorProps = {
    status: number
    message: string
    data?: any
} | null

export const useLogout = (): {error: ErrorProps, logout: (url: string) => Promise<{ status: number, message: string, data?: any }>} => {
    const [error, setError] = useState<ErrorProps>(null)
    const {authDispatch} = useAuthContext()

    const logout = (url: string): Promise<{ status: number, message: string, data?: any }> => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            })
            .then(res => !res.ok? rejectJson(res) : (() => {authDispatch({type: "LOGOUT", payload: ""}); return res.json()})())
            .then(json => resolve(json))
            .catch(e => setError(e))
        })
    }

    return {error, logout}
}