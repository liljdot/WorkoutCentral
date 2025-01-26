import useGetHost from "./useGetHost"

const useDeleteWorkout = (): (id: string | undefined) => Promise<Response> => {
    const host = useGetHost()

    const deleteWorkout: (id: string | undefined) => Promise<Response> = (id) => {
        return fetch(`http://${host}/api/workouts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
    }

    return deleteWorkout
}

export default useDeleteWorkout