import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Importing Font Awesome icons
import gas from "./cheffire.jpg";
import { FaArrowLeft } from 'react-icons/fa';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7085/api/Order/GetOrders')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleBackClick = () => {
    navigate('/products');
  }

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
            <Nav.Link as={Link} to="/Adminview-dealers" style={{ color: 'black' }}>Dealers</Nav.Link>
            <Nav.Link onClick={() => navigate('/adminreviews')} style={{ color: 'white' }}>Feedback</Nav.Link>
            <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerId}</td>
                    <td>{order.productName}</td>
                    <td>${order.price}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-left mt-3">
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
