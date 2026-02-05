import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Tours from './views/Tours'
import Home from './views/Home'
import EditTours from './views/EditTours'
import SignUp from './views/SignUp'
import Login from './views/Login'
import DashBoard from './views/DashBoard'
import NewTours from './views/NewTours'
import Profile from './views/Profile'
function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tours' element={<Tours/>}/>
      <Route path='/editTours' element={<EditTours/>}/>
      <Route path='/dashBoard' element={<DashBoard/>}/>
      <Route path='/tours/new' element={<NewTours/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
