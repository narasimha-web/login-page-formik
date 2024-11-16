import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import { NavLink,useNavigate} from 'react-router-dom';

const Login = () => {
    const [users,setUsers]=useState(JSON.parse(localStorage.getItem('users') || '[]'));


   const ErrorComponent = (props) => {
       return (
           <div>
               <p className='error'>{props.children}</p>
           </div>
       );
   };
   const Navigate = useNavigate()
 

   const initialValues = {
       email: '',
       password: ''  // Updated to include password instead of name
   };

   const validationSchema = yup.object({
       email: yup.string().email('Invalid Email').required('Required'),
       password: yup.string().required('Required'),  // Use string if password includes alphanumeric characters
   });

   const onSubmit = (values) => {
  console.log(values);
  const findingData = users.find((user)=> user.email ===values.email && user.password === values.password);
  if(findingData){
    localStorage.setItem('loginUser',values.email);
    localStorage.setItem('password' ,values.password)
    Navigate('/dashboard');
  }else{
    alert("invalid credentiales")
  }
   };
 
   return (
       <section>
           <div className='block'>
               <div className='MainBlock'>
                   <div className='mfirstBlock'>
                       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}  >
                           <Form className='formDimension'>
                               <p className='text'>Welcome Back</p>
                               <Field type='email' className= 'formdimension' name='email' placeholder='Your Email' />
                               <ErrorMessage name='email' component={ErrorComponent} />
                               <Field type='password' className=' formdimension' name='password' placeholder='Your Password' />
                               <ErrorMessage name='password' component={ErrorComponent} />
                               <div className='checkbox'>
                                   <Field type='checkbox' className='check' name='check' />Remember Me
                               </div>
                               <Button type='submit' className='button' >Login</Button>
                           </Form>
                       </Formik>
                       <div className='navLinks'>
                           <NavLink to='#' className='navlink1'>Reset Password?</NavLink>
                           <NavLink to='/Signup' className='navlink2'>Sign Up</NavLink>
                       </div>
                   </div>
                   <div className='mSecondBlock'>
                       <img src='https://wpmedia.roomsketcher.com/content/uploads/2022/01/04105714/Home-Office-nathan-riley-unsplash.jpg' alt='backImage' width='500px' height='500px'className='mSecondBlock' />
                   </div>
               </div>
           </div>
       </section>
   );
};

export default Login;
