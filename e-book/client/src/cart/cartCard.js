import React,{useState} from 'react';
import { useEffect } from 'react';
import ".//cart.css";

const CartCard = ({cart, setCart,  itemPrice, setItemPrice, total }) => {
    
    const addCart=(id)=>{
        const tempProductList = [...cart]
        tempProductList[id]['quantity']++
        setCart(tempProductList)
        total();
      }
    
    const subCart=(id)=>{
        if(cart[id]['quantity']===1){
            return
        }
        else{
        const tempProductList = [...cart]
        tempProductList[id]['quantity']--
        setCart(tempProductList)
        }
        total();
      }

    
    
    const handleRemove = (d) => {
        const arr = cart.filter((item , id) => {
           if(id !== d){
            return true
           }
        });
        console.log(arr)

        setCart(arr);
        total();

    };
    
    useEffect(()=>{
        total();
    }, [cart])

  return (
    <article>
        {
            cart?.map((item, id)=>(
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.image} />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button onClick={()=>addCart(id)}> + </button>
                        <button>{item.quantity}</button>
                        <button onClick={()=>subCart(id)}> - </button>
                    </div>
                    <div>
                        <span>{item.price}</span>
                        <span>{item.price*item.quantity}</span>
                        <button onClick={() => handleRemove(id)} >Remove</button>
                    </div>
                </div>
))}
        <div className='total'>
            <span>Total Price </span>
            <span>Rs - {itemPrice}</span>
        </div>
    </article>
  )
}

export default CartCard