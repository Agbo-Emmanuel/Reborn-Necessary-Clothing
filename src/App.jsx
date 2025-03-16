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
import Account from './pages/Account'
import AccountLanding from './pages/AccountLanding'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'
import Dashboard from './dashboard/Dashboard'
import DashboardLanding from './dashboard/DashboardLanding'
import Product from './dashboard/Product'
import ManageOrders from './dashboard/ManageOrders'
import ManageUsers from './dashboard/ManageUsers'
import AddProduct from './dashboard/AddProduct'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/admin-login' element={<Login/>}/>
          <Route path = '/register' element={<Register/>}/>
          <Route element={<DashboardLanding/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/manage-products' element={<Product/>}/>
            <Route path='/manage-orders' element={<ManageOrders/>}/>
            <Route path='/manage-users' element={<ManageUsers/>}/>
            <Route path='/add-product' element={<AddProduct/>}/>
          </Route>
          <Route element={<Landing/>}>
            <Route path = '/' element={<Home/>} />
            <Route path = '/detail/:id' element={<Detail/>} />
            <Route path='/product-category/:category' element={<ProductCategory/>}/>
            <Route path='/designer-mood' element={<NewArrivals/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout/:orderId' element={<Checkout/>}/>
            <Route element={<AccountLanding/>}>
              <Route path='/account' element={<Account/>}/>
              <Route path='/orders' element={<Orders/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App