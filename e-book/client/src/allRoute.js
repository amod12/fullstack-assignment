import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './auth/register';
import Login from './auth/login';
import Home from './sharedScreen/home';
import NavBar from './components/navBar';

const AllRoute = () => {
  return (
    <div>
      <NavBar/>
      <Routes> 
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />

      </Routes>
    </div>
  )
}

export default AllRoute
