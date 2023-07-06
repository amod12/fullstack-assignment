import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { message, } from 'antd';


 
const UserOrder = () => {
  const {role, _id, token} =useSelector(state=>state.user)
  const [orders, setOrders]= useState([])
  console.log(orders)
  
  const splitOrder = [];

  orders.forEach((obj) => {
   obj.orders.forEach((order) => {
    splitOrder.push({
       title: [order][0].title,
       isbn: [order][0].isbn,
       quantity: [order][0].quantity || 1,
       price: [order][0].price *([order][0].quantity || 1),
       name: obj.name,
       userId: obj.userId,
       phone: obj.phone,
       address: obj.address,
       email:  obj.email,
       pickupDate:  obj.pickupDate,
       pickupTime:  obj.pickupTime,
       totalPrice:  obj.totalPrice,
     });
   });
 });


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setIdAndShowModal = (item) => {
    // setItemSelectedForEdit(item)
    showModal()
  }
const columns = [
  {
    title: 'Pickup Date',
    dataIndex: 'pickupDate',
  },
  {
    title: 'Pickup Time',
    dataIndex: 'pickupTime',
  },
  {
    title: 'Reciver Name',
    dataIndex: "name"
  },
  {
    title: 'Phone Number',
    dataIndex: "phone"
  },
  {
    title: 'Title ',
    dataIndex: 'title'
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn'
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
 
]

  const fetchAvailableItems= ()=>{
    const requestOptions = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
    axios.get(`${process.env.REACT_APP_API_URL}/orders?userId=${_id}`, requestOptions).then((response) => {
        setOrders(response.data.orders)
      });
}
useEffect( ()=>{
     fetchAvailableItems()
}, [])

  return (
    <>   

<Modal
        title="Edit Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
      
        
      </Modal>

      <div>
      <Table dataSource={splitOrder} columns={columns} />;
      </div>
    </>
  );
};
export default UserOrder;