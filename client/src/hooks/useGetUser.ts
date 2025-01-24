import { useState } from "react"
import { rejectJson } from "./rejectJson"

interface ReturnProps {
    getUser: (url: string) => Promise<{ status: number, message: string, data?: any }>
    error: { status: number, message: string, data?: any } | null
    isLoading: boolean
}

const useGetUser = (): ReturnProps => {
    const [error, setError] = useState<{ status: number, message: string, data?: any } | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getUser = (url: string): Promise<{ status: number, message: string, data?: any }> => {
        return new Promise((resolve, reject) => {
            setIsLoading(true)
            fetch(url, {
                credentials: "include"
            })
                .then(res => !res.ok ? rejectJson(res) : res.json())
                .then(json => resolve(json))
                .catch(e => {setError(e); reject(e)})
                .finally(() => setIsLoading(false))
        })
    }

    return { getUser, error, isLoading }
}

export default useGetUser