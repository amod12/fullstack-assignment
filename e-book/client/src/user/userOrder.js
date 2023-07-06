import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modal, Button,Table } from "antd";
import { useSelector } from "react-redux";
import { message,Popconfirm } from 'antd';


 
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
       quantity: [order][0].quantity,
       price: [order][0].price,
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

console.log(splitOrder);

  const triggerDelete = async(id)=>{
   const requestOptions = {
    method:"DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({_id: id}),
  };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`,requestOptions);
  
  if(res.status===200){
    fetchAvailableItems()
    message.success("Orders deleted successfully",[2])
  }
  }

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
  {
    title: 'Actions',
    key: 'key',
    dataIndex: 'key',
    render: (_, item) => (
      <>
      <Button onClick={()=>setIdAndShowModal(item)}>
       {role==='admin'?'Accept':'Edit'}
     </Button>
     <Popconfirm
  title="Delete the task"
  description="Are you sure to delete this task?"
  okText="Yes"
  cancelText="No"
  onConfirm={()=>triggerDelete(item._id)}
>
  <Button>
  Delete
</Button>
</Popconfirm>
     {/* <Button onClick={()=> triggerDelete(item._id)}>
       {'Delete'}
     </Button> */}
      </>
    ),
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