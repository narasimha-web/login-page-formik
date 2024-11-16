 import React, {useState} from 'react';
 import { Formik,Form,Field,ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import { NavLink,useNavigate } from 'react-router-dom';
import * as yup from 'yup'
 
 const Signup = () => {
  const [users, setUsers]= useState(JSON.parse(localStorage.getItem('users') || '[]'))

  const navigate = useNavigate();
  const ErrorComponent = (props) => {
    return (
        <div>
            <p className='signuperror'>{props.children}</p>
        </div>
    );
};
  const initialValues = ({
    userName :'',
    password:'',
    email:'',
    number:''
  })
  const validation = yup.object({
    userName:yup.string().required('Required'),
    password:yup.number().required('required'),
    email:yup.string().email('Invalid Format').required("Required"),
    number:yup.number().required('Required')
  })
 

  const onSubmit = (values) => {
    const index = users.findIndex((user) => user.email === values.email);
    if (index !== -1) {
        alert('This email is already registered.');
    } else {
        const savedUsers = [...users, values];
        localStorage.setItem('users', JSON.stringify(savedUsers));
        setUsers(savedUsers);
        navigate('/login');
    }
};


   return (
    <section>
    <div className='block'>
    <div className='MainBlock'>
        <div className='mfirstBlock'> 
          <div>   <p className='signupText'>Wellcome Back</p></div>
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
            <Form className='SignupDimension'>
                <Field type='name'className=' formdimension' name='userName' placeholder='Your UserName'></Field><br></br>
                <ErrorMessage name='userName' component={ErrorComponent }></ErrorMessage>
                <Field type='password' className=' formdimension' name='password' placeholder='Your Password'></Field><br></br>
                <ErrorMessage name='password' component={ErrorComponent }></ErrorMessage>
                <Field type='email'className=' formdimension' name='email' placeholder='Your Email'></Field><br></br>
                <ErrorMessage name='email' component={ErrorComponent }></ErrorMessage>
                <Field type='number' className=' formdimension' name='number' placeholder='Your Number'></Field><br></br>
                <ErrorMessage name='number' component={ErrorComponent }></ErrorMessage>
                <div  className='checkbox'>
                <Field type='checkbox' className='check' name='check'></Field>Remember Me<br></br>
                </div>
                <Button type='submit' className='button'>Signup</Button>
            </Form>
          
        </Formik>
        <div className='navLinks'>
           <NavLink to='/Login' className='signlink'>Login</NavLink>
         
        </div>
        </div>

        <div className='mSecondBlock'>
         <img src='https://wpmedia.roomsketcher.com/content/uploads/2022/01/04105714/Home-Office-nathan-riley-unsplash.jpg' alt='backImage' width={'500px'} height={'500px'}></img>
        </div>
    </div>
    </div>
</section>
   )
 }
 
 export default Signup