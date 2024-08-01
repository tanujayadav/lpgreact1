import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import gas from "./cheffire.jpg";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Modal, Form } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function DealerForm() {
  const [dealerName, setDealerName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  async function Signup() {
    try {
      let item = { dealerName, city, phone };
      let result = await fetch('https://localhost:7085/api/Dealer', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const responseData = await result.json();
      
      if (!result.ok) {
        // Handle HTTP errors
        alert('Signup Unsuccessful: ' + (responseData.message || JSON.stringify(responseData)));
      } else {
        if (responseData.status !== 400) {
          alert('Signup Successful');
          navigate('/dealer-form');
        } else {
          alert('Signup Unsuccessful: ' + (responseData.message || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup Unsuccessful: ' + error.message);
    }
  }

  const handleSignup = () => {
    Signup();
  }

  const handleBackClick = () => {
    navigate('/Adminview-dealers');
  };

 
  return (
    <div><Navbar bg="black" variant="light" expand="lg">
      <Nav.Link onClick={handleBackClick} style={{ color: 'white' }}>
            <FaArrowLeft style={{ fontSize: '24px' }} />
          </Nav.Link>
    <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'Lobster, cursive', color: 'white' }}>
      <img src={gas} className="App-logo" alt="gas" style={{ width: '60px', height: '60px' }} />
      {' '}
      ChefFuel
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/Adminview-dealers" style={{ color: 'white' }}>Dealers</Nav.Link>
        <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ minHeight: '100vh' }}>
      <MDBRow>
        <h2>Dealer Registration</h2>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong" style={{ marginBottom: '-100px' }}></div>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label="Dealer Name" value={dealerName} onChange={(e) => setDealerName(e.target.value)} required type="text" />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='City' value={city} onChange={(e) => setCity(e.target.value)} required type='text' />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <div className="text-center">
                  <Button onClick={handleSignup} color="primary" variant="contained" style={{ marginRight: '10px' }}>
                    Create
                  </Button>
                  
                </div>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer></div>
  );
}

export default DealerForm;
