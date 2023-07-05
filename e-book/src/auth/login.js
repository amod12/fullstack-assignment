import React, { useState } from "react";
import { CustomButton } from "../components/customButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Login = () => {
    const [showPassword, setShowPassword] = useState(true)
    const usersSchema = Yup.object().shape({
        email: Yup.string() 
            .min(3, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        password: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
    });
    return (
        <>
        <div>
            <div>
            <div>
                <h2>Login page</h2>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={usersSchema}
                    >
                        {({ errors, touched }) => (
                            <div style={{ display: "flex", alignItem: 'center', justifyContent: 'center' }}>
                                <Form >
                                    <div>
                                        <Field name="email" placeholder="email" />
                                        {errors.email && touched.email ? (
                                            <div className="validaton-message">{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="password-field">
                                        <Field name="password" placeholder="Password" type={showPassword ? 'password' : 'text'} />
                                        <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} className="show-password" />
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div className="validaton-message">{errors.password}</div>
                                    ) : null}
                                    {/* <span><Link to ={'/forgot'}> Forgot password? </Link> </span> */}
                                    <CustomButton name='Submit' type="submit" />
                                    
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
                <div>
                    <div>
                        <div className="">
                            <span><Link to='/register'>Create an account </Link></span>
                        </div>                              
                                    
                    </div>
                </div>
            </div>      
        </div>
        </>
    );
};

export default Login;
