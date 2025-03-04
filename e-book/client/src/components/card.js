import React, { useState } from 'react'
import { Modal } from "antd";
import AddItems from '../sharedScreen/addItems';
import { useNavigate } from "react-router-dom";


const Card = (props) => {
   const navigate = useNavigate()
   const [isModalOpen, setIsModalOpen] = useState(false)

   const triggerDelete = async()=>{
      const requestOptions = {
         method:"DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({_id: props.item._id}),
       };
       const res = await fetch(
         `${process.env.REACT_APP_API_URL}/items`,
         requestOptions
       );
      if(res.status === 204) props.fetchAvailableItems()
   }

   const nextPage=()=>{
      navigate('/itemPage',  { state: props.item });            
   }
   return (
      <>
      <Modal
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}>
            {props.item.catagoryName}
            {props.role === 'admin' ? <AddItems item={props.item} isAdminEdit={true}/> : ""}
         </Modal>
        <div style={{width: 300}}>
         <div onClick={()=> nextPage()} className='category'id='userCardTheme'>
            <img src={props.item.image} alt="Logo" width={'90%'} style={{margin:'5%'}} /><br/> 
            <div style={{ color: 'black' }}>{props.item.title} by {props.item.author}<br/></div>
            <div style={{ color: 'black' }} >{props.item.price } <br/>  </div>
            <div style={{ color: 'black' }} >{props.item.status } <br/>  </div>
         </div >
         <span style={{marginLeft:'55%', padding:"10px"}}>   {props.role === 'user' ?  <button onClick={() => triggerDelete()}>Delete</button>: ''}
      </span>
         </div >
      </>
   )
}
export default Card;