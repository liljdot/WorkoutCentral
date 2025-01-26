import { CSSProperties, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { Workout } from "../types"
import { Button } from "react-bootstrap"

//date-fns
import { format } from "date-fns"
import useDeleteWorkout from "../hooks/useDeleteWorkout"

//spinner
import { ClipLoader } from "react-spinners"

const Workout: React.FC = () => {
    let host: string = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    const { id } = useParams()
    const [workout, setWorkout] = useState<Workout>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<{ status: number, message: any } | null>(null)
    const navigate = useNavigate()
    const deleteWorkout = useDeleteWorkout()
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        position: "relative"
    }

    const handleDelete: React.EventHandler<React.MouseEvent> = async () => {
        try {
            const res = await deleteWorkout(id)

            if (!res.ok) {
                const deleteError = await res.json()
                if (deleteError.status == 401) {
                    return navigate("/login")
                }
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
                setIsLoading(true)
                const res = await fetch(`http://${host}/api/workouts/${id}`, {
                    credentials: "include"
                })

                if (!res.ok) {
                    const fetchError = await res.json()
                    setError(fetchError)
                    setIsLoading(false)
                    return
                }

                setWorkout(await res.json())
                setIsLoading(false)
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
                    ) : isLoading ? (
                        <ClipLoader
                            color="var(--primary)"
                            cssOverride={override}
                            loading={true}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (<>
                        <div className="error">{error?.message || "Workout Data Not Found"}</div>
                        <Link to={"/"}><button>View My Workouts</button></Link>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default Workout