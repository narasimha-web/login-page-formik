import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import NavbarLayout from './components/NavbarLayout';


const PrivateRoute = ({  component }) => {
  const authenticate = localStorage.getItem('loginUser') ? true : false;
  return authenticate ? (
  <NavbarLayout>{component}</NavbarLayout>
  ) : (
    <Navigate
      to={'/login'}
    />
  );
};

const UnPrivateRoute = ({  component }) => {
  const authenticate = localStorage.getItem('loginUser') ? true : false;
  return !authenticate ? (
    component
  ) : (
    <Navigate
      to={'/'}
    />
  );
};


const App = () => {
  return (
    <section>
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />}/>
        <Route path="/login" element={<UnPrivateRoute component={<Login/>}/>} />
        <Route path="/signup" element={<UnPrivateRoute component={<Signup/>}/>} />
        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard/>}/>} />
        <Route path='/users' element={<PrivateRoute component={<Users/>}/>}/>
      </Routes>
     
    </section>
  );
}

export default App;
