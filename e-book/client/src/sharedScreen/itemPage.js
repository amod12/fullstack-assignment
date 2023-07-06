import React from 'react'
import { CustomButton } from '../components/customButton'
import { useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom' 
import "../App.css"


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
    <div className='container'>
      <img src={state.image} alt="Logo" width={'500px'} height={'300px'} className='img_made' /> <br/>  
    </div>
    <div className='list'>
      <h1>Title: {state.title}</h1> 
      <h2> Written by: {state.author} </h2>
      <h2>Price: {state.price}</h2> 
      <h2>Status:{state.status}</h2> 
      <h2>Isbn:{state.isbn}</h2> 
      <h3>Category:{state.category}</h3> 
      <h3>Description: {state.description}</h3> 

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
