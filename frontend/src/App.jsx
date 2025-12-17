import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Signin from './compnent/Sign-in'
import Signup from './compnent/Sign-up'
import Home from './compnent/Home'

export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}
