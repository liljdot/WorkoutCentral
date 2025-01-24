import { useState } from "react"
import { rejectJson } from "./rejectJson"

const useSignup = (): { error: { status: number, message: string, data?: any } | null, isLoading: boolean, signup: any } => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<{ status: number, message: string, data?: any } | null>(null)

    const signup = (email: string, password: string, url: string): any => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })
                .then(response => !response.ok ? rejectJson(response) : response.json())
                .then(json => { setIsLoading(false); resolve(json.data.token) })
                .catch(e => { setError(e); setIsLoading(false) })
        })
    }


    return { signup, error, isLoading }
}

export default useSignup