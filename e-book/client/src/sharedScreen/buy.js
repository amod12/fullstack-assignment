import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../components/customButton";
import { useSelector } from 'react-redux';
import { responseHandler } from "../utils/responseHandler"
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {message } from 'antd'; 
import { useLocation } from 'react-router-dom'


function Buy({itemPrice, setItemPrice}) {
  const usersSchema = Yup.object().shape({
    location: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    name: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    address: Yup.string()
      .min(3, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),

    phone: Yup.number().required("Required"),

    quantity: Yup.number().required("Required"),


    });
  const buyFormFields = [
    
    {name: 'name',  placeholder: 'Name'},
    {name: 'address',  placeholder: 'Address'},
    {name: 'phone',  placeholder: 'Phone'},
    {name: 'email',  placeholder: 'Email'},
    {name: 'location', placeholder: 'Location'},
    {name: 'pickupDate', placeholder: 'PickupDate'},
    {name: 'pickupTime', placeholder: 'PickupTime'},

  ];

  const {state} = useLocation();
  const {address, name, email, phone, _id  }= useSelector(state=>state.user)
  
  return (
      <div>    
            <Formik
              initialValues={{ 
                name: name,
                address: address,
                email: email,
                phone: phone,
                userId: _id,
                orders: state?.map((item)=>{
                    return {
                      title : item.title,
                      author : item.author,
                      isbn : item.isbn,
                      catagory: item.catagory,
                      price: item.price,
                      image: item.image,
                      quantity: item.quantity !== null ? item.quantity : 1
                     }
                    }) , 
                    totalPrice: itemPrice !== 0 ? itemPrice : state.reduce((total, item) => total + (item.price), 0)
                  }}
              validationSchema={usersSchema}
              onSubmit={async(values) => { 

                const requestOptions = {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(values),
                 };
                 const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, requestOptions);
                  const data = await res.json()
                  const notify = responseHandler(res, data.errorMsg)
                  toast(notify)
                  
                  if (data) {
                    message.success(data.msg, [2])
                    setItemPrice(0); 
                  } else {
                    message.error(data.errorMsg, [2])
                  }
             }}
            >
           {({  errors, touched }) => (
            <div>
              <Form>
                {buyFormFields.map(field => (
                  <div  style={{display: 'flex'}} key={field.name}>
                    <Field
                      type={field.name==="pickupDate"?'date':field.name==="pickupTime"?'time' :"text" }
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && touched[field.name] ? (
                        <div className="validaton-message">{errors[field.name]}</div>
                      ) : null}
                    <br />
                  </div>
                ))}
                  <CustomButton name="Submit" type="submit" />
                </Form>
                </div>
              )}
            </Formik>
      </div>
  )
}

export default Buy
