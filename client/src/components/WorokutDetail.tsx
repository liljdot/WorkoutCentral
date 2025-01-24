import { useContext, useState } from "react"
import { Workout } from "../types"
import "./styles.css"
import { allWorkoutsContext } from "../contexts/allWorkoutsContext"
import { Link } from "react-router-dom"

//date-fns
import { formatDistanceToNow } from "date-fns"

interface Props {
    workout: Workout
}

const WorkoutDetail: React.FC<Props> = ({ workout }) => {
    let host = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    const workoutsContext = useContext(allWorkoutsContext)
    if (!workoutsContext) {
        throw new Error("context must have value")
    }

    const { workoutsDispatch } = workoutsContext
    const [deleteError, setDeleteError] = useState<{ status: number, message: any } | null>(null)

    const handleDelete: React.EventHandler<React.MouseEvent> = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://${host}/api/workouts/${workout.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                const error = await response.json()
                setDeleteError(error)
                return
            }

            workoutsDispatch({ type: "DELETE_WORKOUT", payload: workout.id })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        < Link to={`/workout/${workout.id}`} style={{textDecoration: "none"}}>
            <div className="workoutDetails">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
                <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
                {deleteError && <div className="error">{deleteError.message}</div>}
            </ div>
        </Link>
    )
}

export default WorkoutDetail