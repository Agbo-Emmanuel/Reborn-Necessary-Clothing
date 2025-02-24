import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Detail from './pages/Detail'
import ProductCategory from './pages/ProductCategory'
import NewArrivals from './pages/NewArrivals'
import Cart from './pages/Cart'
import Login from './pages/onBoarding/Login'
import Register from './pages/onBoarding/Register'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/register' element={<Register/>}/>
          <Route element={<Landing/>}>
            <Route path = '/' element={<Home/>} />
            <Route path = '/detail' element={<Detail/>} />
            <Route path='/product-category/:category' element={<ProductCategory/>}/>
            <Route path='/designer-mood' element={<NewArrivals/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App