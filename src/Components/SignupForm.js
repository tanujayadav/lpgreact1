import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  async function Signup() {
    try {
      let item = { username, password, name, email, address, phoneNo };
      let result = await fetch('https://localhost:7085/api/Signup', {
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
          navigate('/login');
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

  return (
    <MDBContainer fluid className='p-4' style={{ backgroundColor: '#1c1c1c', minHeight: '100vh' }}>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h3 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#f1f1f1' }}>
            Welcome To<br />
            <span style={{ color: '#f1f1f1', fontFamily: 'Lobster, cursive' }}>ChefFuel</span>
          </h3>
          <p className='px-3' style={{ color: '#f1f1f1' }}>
            "Welcome to GasOnCall – your reliable solution for cooking gas cylinder delivery. With our easy-to-use app, you can book gas cylinders in just a few taps, ensuring your kitchen never runs out of fuel. Enjoy fast delivery, secure payments, and exceptional customer service. Experience the convenience of hassle-free gas bookings with GasOnCall today!"
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong" style={{ marginBottom: '-100px' }}></div>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label="Name" value={username} onChange={(e) => setUsername(e.target.value)} required type="text" />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} required type='text' />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Last Name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Mobile' type='text' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
              <Button onClick={handleSignup} color="primary" variant="contained">
                Signup
              </Button>
              <p style={{ color: 'blue' }}>Already have an account? <a href="/login" style={{ color: 'blue' }}> Login </a></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupForm;
