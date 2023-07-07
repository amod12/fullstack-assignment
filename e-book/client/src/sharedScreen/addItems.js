import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useState } from 'react';
import { message } from 'antd';


const AddItems =({isAdminEdit, item, handleCancel})=>{
  const [image, setImage]=useState('')

  const itemSchema = Yup.object().shape({
    
    title: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    author: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    isbn: Yup.string()
      .min(13, "Too Short!")
      .max(14, "Too Long!")
      .required("13 number Required"),

    price: Yup.string()
      .required("Required"),

    file:Yup.mixed().test('hasFile','image is required',()=>{
      if(image){
        return true
      }
      return false
    }),

    catagory: Yup.string().required("Required"),

    status: Yup.string().required("Required"),


    description: Yup.string()
    .min(2, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  });
  
  const submitImage = async ()=>{
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'pztinjet')
    data.append('cloud_name', 'djnspkxht')   

    const res = await fetch('https://api.cloudinary.com/v1_1/djnspkxht/image/upload', {
      method: 'post',
      body: data
    })
    const newData = await res.json();
    return newData.url
  }
    return(
        <>
        <Formik
           initialValues={item ||
        {
          title: "",
          author: "",
          isbn: "",
          status: "",
          price: "",
          photo: "",
          description:"",
          catagory: "",
        }
        // writing photo:' ' to show errors in form
        }
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            let imageUrl = await submitImage();
            values.image = imageUrl
            const requestOptions = {
              method: isAdminEdit ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            };
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/items`,
              requestOptions
            );
            
            const data = await res.json();
            if (res.status === 200) {
              toast.success(data.msg)
            } else {
              toast.error(data.msg);
            }
            handleCancel();
            resetForm({ values: "" });
          }}
        >
          {({ errors, touched }) => (
          <div>
            <Form>
              <div>
                <Field name="title" placeholder="Title" />
                {errors.title && touched.title ? (
                  <div className="validaton-message">{errors.title}</div>
                ) : null}
              </div>
              <div>
                <Field name="author" placeholder="Author" />
                {errors.author && touched.author ? (
                  <div className="validaton-message">{errors.author}</div>
                ) : null}
              </div>
              <div>
                <Field name="isbn" placeholder="ISBN" />
                {errors.isbn && touched.isbn ? (
                  <div className="validaton-message">{errors.isbn}</div>
                ) : null}
              </div>
              <div>
                <Field
                  name="price"
                  placeholder="price"
                  type="number"
                />
                {errors.price && touched.price ? (
                  <div className="validaton-message">{errors.price}</div>
                ) : null}
              </div>
              <div>
                <Field name="description" placeholder=" Description" />
                {errors.description && touched.description ? (
                  <div className="validaton-message">{errors.description}</div>
                ) : null}
              </div>
              <div>
                    <Field as="select" name="catagory" placeholder="Catagory ">
                      <option value=""> Catagory</option>
                      <option value="drama">Drama</option>
                      <option value="action">Action</option>
                    </Field>
                    {errors.role && touched.role ? (
                      <div className="validaton-message">{errors.role}</div>
                    ) : null}
              </div>
              <div>
                    <Field as="select" name="status" placeholder="Status ">
                      <option value=""> Status</option>
                      <option value="Available">Available</option>
                      <option value="Sold out">Sold out</option>
                    </Field>
                    {errors.status && touched.status ? (
                      <div className="validaton-message">{errors.status}</div>
                    ) : null}
                  </div>
              <div>
                <input type='file' onChange={(e) => setImage(e.target.files[0])} className=''></input>
                {image && <img src={URL.createObjectURL(image) } width={300} />}


              </div>
              <button className="button" onClick={() => image ? '' : message.error("Please Fill the form completely", [2])}>{isAdminEdit ? 'Save Item' : 'Add Item'}</button>
            </Form>
          </div>
        )}
        </Formik>

        </>
    )
} 

export default AddItems