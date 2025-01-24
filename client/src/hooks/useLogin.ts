import { useState } from "react"
import { rejectJson } from "./rejectJson"

type ErrorProps = {
    status: number
    message: string
    data?: any
} | null

export const UseLogin = (): {error: ErrorProps, isLoading: boolean, login: any} => {
    const [error, setError] = useState<ErrorProps>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const login = (email: string, password: string, url: string): Promise<string | ErrorProps> => {
        return new Promise((resolve, reject) => {
            setIsLoading(true)
            
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            })
            .then(res => !res.ok ? rejectJson(res) : res.json())
            .then(json => resolve(json.data))
            .catch(e => {setError(e); setIsLoading(false)})
        })
    }

    return {error, isLoading, login}
}