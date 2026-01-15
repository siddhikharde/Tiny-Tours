import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Tours from './views/Tours'
import Home from './views/Home'
import EditTours from './views/EditTours'
function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tours' element={<Tours/>}/>
      <Route path='/editTours' element={<EditTours/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
