 import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
 
 const NavbarLayout = ({children}) => {
  const Navigate = useNavigate()
  const handleLogOut =()=>{
    localStorage.removeItem('loginUser')
    Navigate('/Login')
  }
   return (
     <section>
            <Navbar bg="primary" data-bs-theme="dark" className='background' fixed="top" poistion='fixed'>
        <Container className='navhome'>
          <h4 className='employtext'>Employe DashBoard</h4>
          <Navbar.Brand href="#home" className='navlink'></Navbar.Brand>
          <Nav className="me-auto groupNavlink">
            <NavLink to='/Dashboard' className='navlink'>Employ DashBoard</NavLink>
            <NavLink to='#' className='navlink'>Contacts</NavLink>
            <NavLink to='#' className='navlink'>EmployeData</NavLink>
            <NavLink to='/Users' className='navlink'>Users</NavLink>
          </Nav>
        </Container>
        <p className='icon'>LogOut <i class="fa-solid fa-right-to-bracket" onClick={handleLogOut}></i></p>
      </Navbar>
      <div className='navChild'>{children}</div>
   
     </section>
   )
 }
 
 export default NavbarLayout;