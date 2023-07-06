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


const AllRoute = () => {
   const [cart, setCart] = useState([]);
   const handleClick = (item) => {
    let added;
    cart.map((cart)=>{
      if (cart.catagoryName === item.catagoryName){
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

  const [itemPrice, setItemPrice] = useState(0);
    const total=()=>{
        let a = 0
        cart.map((item)=>{ 
          a = (item.price * item.quantity) + a
        })
        return setItemPrice(a);
      }
 
  return (
    <div>
      <NavBar/>
      <Routes> 
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        {/* passing function handleClick as props */}
        <Route path="/itemPage" element={<ItemPage handleClick={handleClick} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} itemPrice={itemPrice} setItemPrice={setItemPrice} total={total}/>} />
        <Route path="/buy" element={<Buy itemPrice={itemPrice}/>} />

      </Routes>
    </div>
  )
}

export default AllRoute
