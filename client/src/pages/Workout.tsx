import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Workout } from "../types"
import { Button } from "react-bootstrap"

//date-fns
import { format } from "date-fns"

const Workout: React.FC = () => {
    let host: string = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    const { id } = useParams()
    const [workout, setWorkout] = useState<Workout>()
    const [error, setError] = useState<{ status: number, message: any } | null>(null)

    const handleDelete: React.EventHandler<React.MouseEvent> = async () => {
        try {
            const res = await fetch(`http://${host}/api/workouts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) {
                const deleteError = await res.json()
                setError(deleteError)
                return
            }

            // still use the error element to show delete success
            const val = await res.json()
            setError(val)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchWorkout: () => void = async () => {
            try {
                const res = await fetch(`http://${host}/api/workouts/${id}`)

                if (!res.ok) {
                    const fetchError = await res.json()
                    setError(fetchError)
                    return
                }

                setWorkout(await res.json())
            } catch (e) {
                console.log(e)
            }
        }

        fetchWorkout()
    }, [])

    return (
        <div className="workout">
            <div>
                <div className="workoutDetails">
                    {workout ? (
                        <>
                            <h4>{workout.title}</h4>
                            <h3><strong>Load (kg): </strong>{workout.load}</h3>
                            <h3><strong>Reps: </strong>{workout.reps}</h3>
                            <h3>Date: {format(new Date(workout.createdAt), "dd-MM-yyyy     HH:mm:ss")}</h3>
                            <Button className="material-symbols-outlined" onClick={handleDelete}>delete</Button>
                            {error && <div className="error">{error.message}</div>}
                        </>
                    ) : <h4>Workout Data Not Found</h4>}
                </div>
            </div>
        </div>
    )
}

export default Workout