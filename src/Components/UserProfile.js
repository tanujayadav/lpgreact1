import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import gas from "./cheffire.jpg";

function UserProfile() { 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const id = localStorage.getItem('CustomerId');
      const response = await fetch(`https://localhost:7085/api/Signup/GetSignupById/${id}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <>
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
              <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>User Profile</Nav.Link>
              <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
              <Nav.Link as={Link} to="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
              <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "7vh" }}>
        <MDBCard style={{ width: '500px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '15px' }}>
          <MDBCardHeader><center>{user ? user.username : 'Loading...'}</center></MDBCardHeader>
          <MDBCardBody style={{ textAlign: 'center' }}>
            {user ? (
              <>
                <MDBCardText>Email: {user.email}</MDBCardText>
                <MDBCardText>First Name: {user.username}</MDBCardText>
                <MDBCardText>Last Name: {user.name}</MDBCardText>
                <MDBCardText>Address: {user.address}</MDBCardText>
                <MDBCardText>Phone Number: {user.phoneNo}</MDBCardText>
              </>
            ) : (
              <MDBCardText>Loading...</MDBCardText>
            )}
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
}

export default UserProfile;
