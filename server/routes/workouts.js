const express = require("express")
const { getWorkouts, getSingleWorkout, postWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController")
const { requireAuth } = require("../middleware/authMiddleware")


//create route app
const routes = express()

//create routes

    //GET REQUESTS
        //GET all workouts
        routes.get('/', getWorkouts)

        //GET single workout
        routes.get('/:id', getSingleWorkout)

    //POST REQUESTS
        //POST new workout
        routes.post('/', requireAuth, postWorkout)

    //DELETE REQUESTS
        //DELETE a workout
        routes.delete('/:id', deleteWorkout)

    //PUT/PATCH REQUESTS
        //update a workout
        routes.patch('/:id', updateWorkout)

//export routes
module.exports = routes