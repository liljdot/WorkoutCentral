import { FormEvent, FormEventHandler, useContext, useState } from "react"
import { workoutContext } from "../contexts/workoutContext"
import { NewWorkout } from "../types"
import { allWorkoutsContext } from "../contexts/allWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

interface Props {

}

const WorkoutForm: React.FC<Props> = ({ }) => {
    let host = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    const context = useContext(workoutContext)
    if (!context) {
        throw new Error("context must have value")
    }

    const workoutsContext = useContext(allWorkoutsContext)
    if (!workoutsContext) {
        throw new Error("context must have value")
    }

    const { authState } = useAuthContext()
    const { user } = authState
    const { workoutFormState, workoutFormDispatch } = context
    const { workoutsDispatch } = workoutsContext
    const [error, setError] = useState<{ status: number, message: any } | null>(null)
    const { logout } = useLogout()

    const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries());
        const newWorkout: NewWorkout = {
            title: data.title.toString(),
            reps: Number(data.reps),
            load: Number(data.load),
            userId: user?.id
        }

        try {
            const res = await fetch(`http://${host}/api/workouts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWorkout),
                credentials: "include"
            })

            if (!res.ok) {
                const errorRes = await res.json()
                if (errorRes.status == 401) {
                    logout(`http://${host}/api/user/logout`)
                }
                setError(errorRes)
                return
            }

            const workout = await res.json()
            workoutsDispatch({ type: "ADD_WORKOUT", payload: workout })
            setError(null)
            workoutFormDispatch({ type: "RESET_ALL_FIELDS", payload: "" })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title: </label>
            <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { workoutFormDispatch({ type: "SET_TITLE", payload: e.target.value }) }}
                value={workoutFormState.title}
                name="title"
            />

            <label>Load (kg): </label>
            <input
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { workoutFormDispatch({ type: "SET_LOAD", payload: Number(e.target.value) }) }}
                value={workoutFormState.load}
                name="load"
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { workoutFormDispatch({ type: "SET_REPS", payload: Number(e.target.value) }) }}
                value={workoutFormState.reps}
                name="reps"
            />

            <button>Add Workout</button>
            {error && <div className="error">{error.message}</div>}
        </form>
    )
}

export default WorkoutForm