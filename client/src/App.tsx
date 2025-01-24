import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useReducer } from 'react'
import Home from './pages/Home'
import PagesLayout from './layouts/PagesLayout'
import { workoutsInitialState, workoutsReducer } from './reducers/workoutsReducer'
import { allWorkoutsContext } from './contexts/allWorkoutsContext'
import Workout from './pages/Workout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RequireAuth from './auth/requireAuth'

function App() {
  const [workouts, workoutsDispatch] = useReducer(workoutsReducer, workoutsInitialState)

  return (
    <div className='App'>
      <BrowserRouter>
        <PagesLayout>
          <div className="pages">
            <allWorkoutsContext.Provider value={{ workouts, workoutsDispatch }}>
              <Routes>
                < Route path='/login' element={<Login />} />
                < Route path='/signup' element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth/>}>
                  < Route path='/' element={<Home />} />
                  <Route path='/workout/:id' element={<Workout />} />
                </Route>
              </Routes>
            </allWorkoutsContext.Provider>
          </div>
        </PagesLayout>
      </BrowserRouter>
    </ div>
  )
}

export default App
