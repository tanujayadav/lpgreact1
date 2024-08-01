import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gas from "./cheffire.jpg";
import { Navbar, Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('CustomerId'); // Retrieve user ID from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`https://localhost:7085/api/Order/GetOrderBySignupId?id=${userId}`)
        .then(response => response.json())
        .then(data => {
          setOrders(data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [userId, navigate]);

  const handleBackClick = () => {
    navigate('/products');
  };

  const handleDownloadReceipt = (order) => {
    const receiptContent = `
      Order ID: ${order.orderId}
      Customer ID: ${order.customerId}
      Product Name: ${order.productName}
      Price: $${order.price}
      Order Date: ${new Date(order.orderDate).toLocaleDateString()}
      Delivery Date: ${new Date(order.deliveryDate).toLocaleDateString()}
      Status: ${order.status}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_order_${order.orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>User Profile</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="row">
            {orders.map((order, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order.orderId}</h5>
                    <p className="card-text">Customer ID: {order.customerId}</p>
                    <p className="card-text">Product Name: {order.productName}</p>
                    <p className="card-text">Price: ${order.price}</p>
                    <p className="card-text">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className="card-text">Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    <p className="card-text">Status: {order.status}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDownloadReceipt(order)}
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
