import React from 'react'
import { CustomButton } from '../components/customButton'
import { useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom' 

function ItemPage({handleClick}) {
 

  const {state} = useLocation();
  const { email }= useSelector(state=>state.user)
  
   const navigate = useNavigate()
  const checkIfLogedIn=()=>{
  if (email === '') {
    navigate('/login'); 
  } 
  
  else {
    navigate('/buy',  { state: [state] });  }
  }
  return (
    <>
    <div>
      <img src={state.image} alt="Logo" width={'500px'} height={'300px'} className='img_made' /> <br/>  
      
    </div>
    <div>
      <h1>{state.title}</h1> 
      <h2> by {state.author} </h2>
      <h2>{state.price}</h2> 
      <h2>{state.status}</h2> 
      <h2>{state.isbn}</h2> 
      <h3>{state.category}</h3> 
      <h3>{state.description}</h3> 

    </div>
   {
    state.status == 'Available'?<div>
      <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        className="flex-container"
      />
        <CustomButton
        name="Add to Cart"
        onClick={()=>handleClick(state)}
              
      /></div>:
      <div>
      <CustomButton
        name="Sold out"     
        />
        </div>
   }
    
    </>
  )
}

export default ItemPage
