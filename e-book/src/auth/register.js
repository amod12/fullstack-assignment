import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../components/customButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
  const usersSchema = Yup.object().shape({
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

    username: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    confirmPassword: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

  });
  const registerFormFields = [
    {name: 'name',  placeholder: 'Name'},
    {name: 'address',  placeholder: 'Address'},
    {name: 'phone',  placeholder: 'Phone'},
    {name: 'username',  placeholder: 'Username'},
    {name: 'email',  placeholder: 'Email'},
    {name: 'password', placeholder: 'Password'},
    {name: 'confirmPassword',  placeholder: 'ConfirmPassword'},
  ];
  
  const [showPassword, setShowPassword] = useState(true)
 
  return (
    <>
    <div className='registerBackground'>  
    <div className="left-side1"></div>
      <div className="register-area">
      
        <div className="right-side1" >    
            <h3>Create an account</h3>
            <Formik
              initialValues={{
                name: "",
                address: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={usersSchema}
            >
           {({  errors, touched }) => (
              <Form>
                {registerFormFields.map(field => (
                  <div key={field.name}>
                    <Field
                      type={field.name === 'password' || field.name === 'confirmPassword' ? showPassword
                      ? 'password'
                      : 'text'
                    : 'text' }
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                    {field.name === 'password'  || field.name === 'confirmPassword' ? <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye}  /> : ''}
                    {errors[field.name] && touched[field.name] ? (
                        <div className="validaton-message">{errors[field.name]}</div>
                      ) : null}
                    <br />
                  </div>
                ))}
                  <CustomButton name="Submit" type="submit" />
                </Form>
              )}
            </Formik>
            <div className="">
                <span>
                  <br/> <Link to="/"> Already have an account Login..</Link>
                </span>
              </div>
      </div>
      </div>
      </div> 
    </>
  );
};

export default Register;