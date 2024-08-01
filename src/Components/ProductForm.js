import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import gas from "./cheffire.jpg";
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductForm() {
  const [gasName, setGasName] = useState('');
  const [dealerId, setDealerId] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!gasName || !dealerId || !price || !city || !address || !availability || !quantity || !description) {
      alert('Please fill in all fields.');
      return false;
    }
    return true;
  };

  async function Signup() {
    if (!validateInputs()) return;

    try {
      let productDetails = {
        gasName,
        dealerId,
        price,
        city,
        address,
        availability,
        quantity,
        description
      };

      let response = await fetch('https://localhost:7085/api/Gas', {
        method: 'POST',
        body: JSON.stringify(productDetails),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server Response:', responseData);
        alert('Signup Unsuccessful: ' + (responseData.message || 'Unknown error occurred.'));
      } else {
        alert('Signup Successful');
        navigate('/product-form');
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
    navigate('/products');
  };

  return (
    <div>
      <Navbar bg="black" variant="light" expand="lg">
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
      <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <MDBRow className="justify-content-center w-100">
          <MDBCol md="8" lg="6" xl="5">
            <MDBCard>
              <MDBCardBody className="p-4">
                <h2 className="text-center mb-4">Product Registration</h2>
                <MDBRow>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Gas Name" type="text" value={gasName} onChange={(e) => setGasName(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Dealer ID" type="number" value={dealerId} onChange={(e) => setDealerId(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Availability" type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                  </MDBCol>
                  <MDBCol xs="12" sm="6">
                    <MDBInput wrapperClass="mb-4" label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </MDBCol>
                </MDBRow>
                <div className="text-center">
                  <Button onClick={handleSignup} color="primary" variant="contained" style={{ marginRight: '10px' }}>
                    Create
                  </Button>
                  
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProductForm;
