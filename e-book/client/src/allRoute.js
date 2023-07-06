import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Register from './auth/register';
import Login from './auth/login';
import Home from './sharedScreen/home';
import NavBar from './components/navBar';
import ItemPage from './sharedScreen/itemPage';
import { message } from 'antd'; 
import Cart from "./cart/cart";
import Buy from "./sharedScreen/buy";
import { useSelector } from "react-redux";



const AllRoute=()=> {


  const {role, token }= useSelector(state=>state.user)
  
  if (role === 'user' && token) {
    return <><NavBar /><UserScreen /></>
  } 
  // else if (role === 'admin' && token) {
  //   return <><NavBar /><AdminScreen /></>
  // }
  return <><NavBar /><AuthScreen /></>
}

const AuthScreen=()=>{
  return (
    <Routes>
    <Route path="/register" element={<Register />} /> 
    <Route path="/" element={<Home/>} />
    <Route path="*" element={<Login />} />

  </Routes>
  )
}

// const AdminScreen=()=>{
//   return(
//     <Routes>
//     <Route path="/register" element={<Register />} />
//     <Route path="/items" element={<Items />} />
//     <Route path="*" element={<PageNotFound />} />
//     <Route path="/profile" element={<Profile />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/itemPage" element={<ItemPage />} />
//     <Route path="/" element={<AdminDashboard />} />
//     <Route path="/buy" element={<Buy />} />
//   </Routes>
//   )
// }

const UserScreen=()=>{
  const handleClick = (item) => {
    let added;
    cart.map((cart)=>{
      if (cart.title === item.title){
          added = true
      }
    })
    if(added !== true){
      item.quantity = 1
      const currentCart = [...cart];
      const newCart = [...currentCart, item];  
      setCart(newCart);
      message.success('Added in cart', [2])
    }
    else{
      message.error('Already in cart', [2])
    }
  };
  const [cart, setCart] = useState([]);

  const [itemPrice, setItemPrice] = useState(0);
    const total=()=>{
        console.log(cart)
        let a = 0
        cart.map((item)=>{ 
          a = (item.price * item.quantity) + a
        })
        console.log(a)
        return setItemPrice(a);
      }
      
 
  return(
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/itemPage" element={<ItemPage handleClick={handleClick} />} />
    <Route path="/buy" element={<Buy itemPrice={itemPrice} setItemPrice={setItemPrice}/>} />
    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} itemPrice={itemPrice} setItemPrice={setItemPrice} total={total}/>} />
  </Routes>
  )
}
 
export default AllRoute;
