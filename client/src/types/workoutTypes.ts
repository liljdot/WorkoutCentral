export type Workout = {
    id: string,
    title: string,
    reps: number,
    load: number,
    userId: string,
    createdAt: string,
    updatedAt: string
}

export type NewWorkout = {
    title: string,
    reps: number,
    load: number,
    userId: string | undefined
}