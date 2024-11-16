import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Users = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('users') || '[]'));

    const handleDelete = (index)=>{
      const  updateData = userData.filter((_,i) => i !== index);
      console.log(updateData)
        setUserData(updateData);
        localStorage.setItem('users',JSON.stringify(updateData))
    }
    return (
        <section>
            <Container>
                <Table bordered hover stripped>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>PhoneNumber</th>
                            <th>Actions</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((eachUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{eachUser.userName}</td>
                                    <td>{eachUser.email}</td>
                                    <td>{eachUser.password}</td>
                                    <td>{eachUser.number}</td>
                                    <td><Button onClick={()=>handleDelete(index)}>Delete</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </section>
    );
};

export default Users;
