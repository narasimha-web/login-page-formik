import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    city: '',
    ctc: '',
    salary: '',
  };

  const ErrorComponent = (props) => {
    return (
      <div>
        <p className='signuperror'>{props.children}</p>
      </div>
    );
  };

  const validationSchema = yup.object({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    city: yup.string().required('Required'),
    ctc: yup.number().required('Required'),
    salary: yup.number().required('Required'),
  });

  const onSubmit = (values) => {
    const newEmployee = {
      id: data.length + 1,
      name: values.firstName,
      username: values.lastName,
      address: { city: values.city },
      ctc: values.ctc,
      salary: values.salary,
    };

    setData([...data, newEmployee]); 
    setShow(false); 
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  const handleDetailsShow = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };


  useEffect(() => {
    const getEmploys = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postData = await response.json();
        setData(postData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    getEmploys();
  }, []);

  return (
    <section className='body'>     
       <br></br><br></br>
      <div className='tableDimension'>
        <Row>
          <Col><h2>Employ Salaries</h2></Col>
          <Col><Button className='employButton' onClick={handleShow}>Add Employe</Button></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employ Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>CTC</th>
                <th>SALARY/MONTH</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((eachEmploy) => {
                return (
                  <tr key={eachEmploy.id}>
                    <td>{eachEmploy.id}</td>
                    <td>{eachEmploy.name}</td>
                    <td>{eachEmploy.username}</td>
                    <td>{eachEmploy.address.city}</td>
                    <td>{eachEmploy.ctc || '100000'}</td>
                    <td>{eachEmploy.salary || '750000'}</td>
                    <td>
                      <Button onClick={() => handleDetailsShow(eachEmploy)}>Details</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='formingModel'>
              <Field type='text' className='modelForm' name='firstName' placeholder='First Name'></Field>
              <ErrorMessage name='firstName' component={ErrorComponent}></ErrorMessage>
              <Field type='text' className='modelForm' name='lastName' placeholder='Last Name'></Field>
              <ErrorMessage name='lastName' component={ErrorComponent}></ErrorMessage>
              <Field type='text' className='modelForm' name='city' placeholder='City'></Field>
              <ErrorMessage name='city' component={ErrorComponent}></ErrorMessage>
              <Field type='number' className='modelForm' name='ctc' placeholder='CTC'></Field>
              <ErrorMessage name='ctc' component={ErrorComponent}></ErrorMessage>
              <Field type='number' className='modelForm' name='salary' placeholder='Salary'></Field>
              <ErrorMessage name='salary' component={ErrorComponent}></ErrorMessage>
              <Button variant="primary" className='modelButton' type="submit">
                Save
              </Button>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for showing employee details */}
      <Modal show={showDetails} onHide={handleDetailsClose}>
        <Modal.Header openButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <p><strong>ID:</strong> {selectedEmployee.id}</p>
              <p><strong>First Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Last Name:</strong> {selectedEmployee.username}</p>
              <p><strong>City:</strong> {selectedEmployee.address.city}</p>
              <p><strong>CTC:</strong> {selectedEmployee.ctc || '100000'}</p>
              <p><strong>Salary/Month:</strong> {selectedEmployee.salary || '750000'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    

      <div className='tableDimension'>
        <Row>
          <Col><h2>Employ Salaries</h2></Col>
          <Col><Button className='employButton' onClick={handleShow}>Add Employe</Button></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employ Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>CTC</th>
                <th>SALARY/MONTH</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((eachEmploy) => {
                return (
                  <tr key={eachEmploy.id}>
                    <td>{eachEmploy.id}</td>
                    <td>{eachEmploy.name}</td>
                    <td>{eachEmploy.username}</td>
                    <td>{eachEmploy.address.city}</td>
                    <td>{eachEmploy.ctc || '100000'}</td>
                    <td>{eachEmploy.salary || '750000'}</td>
                    <td>
                      <Button onClick={() => handleDetailsShow(eachEmploy)}>Details</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='formingModel'>
              <Field type='text' className='modelForm' name='firstName' placeholder='First Name'></Field>
              <ErrorMessage name='firstName' component={ErrorComponent}></ErrorMessage>
              <Field type='text' className='modelForm' name='lastName' placeholder='Last Name'></Field>
              <ErrorMessage name='lastName' component={ErrorComponent}></ErrorMessage>
              <Field type='text' className='modelForm' name='city' placeholder='City'></Field>
              <ErrorMessage name='city' component={ErrorComponent}></ErrorMessage>
              <Field type='number' className='modelForm' name='ctc' placeholder='CTC'></Field>
              <ErrorMessage name='ctc' component={ErrorComponent}></ErrorMessage>
              <Field type='number' className='modelForm' name='salary' placeholder='Salary'></Field>
              <ErrorMessage name='salary' component={ErrorComponent}></ErrorMessage>
              <Button variant="primary" className='modelButton' type="submit">
                Save
              </Button>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for showing employee details */}
      <Modal show={showDetails} onHide={handleDetailsClose}>
        <Modal.Header openButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <p><strong>ID:</strong> {selectedEmployee.id}</p>
              <p><strong>First Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Last Name:</strong> {selectedEmployee.username}</p>
              <p><strong>City:</strong> {selectedEmployee.address.city}</p>
              <p><strong>CTC:</strong> {selectedEmployee.ctc || '100000'}</p>
              <p><strong>Salary/Month:</strong> {selectedEmployee.salary || '750000'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Dashboard;
