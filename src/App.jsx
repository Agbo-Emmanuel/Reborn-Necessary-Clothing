import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Detail from './pages/Detail'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Landing/>}>
            <Route path = '/' element={<Home/>} />
            <Route path = '/detail' element={<Detail/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App