import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Navbar,Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import gas from "./cheffire.jpg";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const userId = localStorage.getItem('CustomerId');
  const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  const navigate = useNavigate();

  const placeOrder = async () => {
    const orderDate = new Date().toISOString();
    const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    let allOrdersPlaced = true;

    for (const item of cartItems) {
      const orderDetails = {
        customerId: userId,
        productName: item.gasName,
        price: item.price,
        orderDate: orderDate,
        deliveryDate: deliveryDate,
        status: "order confirmed"
      };

      try {
        const response = await fetch('https://localhost:7085/api/Order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetails)
        });

        if (!response.ok) {
          console.error('Failed to place order:', response.statusText);
          allOrdersPlaced = false;
          break;
        }
      } catch (error) {
        console.error('Error placing order:', error);
        allOrdersPlaced = false;
        break;
      }
    }

    if (allOrdersPlaced) {
      alert('Order placed successfully!');
      localStorage.removeItem(`cart_${userId}`);
      navigate('/order-confirmation');
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleBackClick = () => {
    navigate('/cart');
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
  
</Navbar>
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title>Payment</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Payment Method</Form.Label>
              <Form.Check
                type="radio"
                id="cash_on_delivery"
                name="paymentMethod"
                value="cash_on_delivery"
                label="Cash on Delivery"
                checked={paymentMethod === 'cash_on_delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
            <div className="mt-4">
              <h3>Total Price: ${getTotalPrice()}</h3>
            </div>
            <Button onClick={placeOrder} className="mt-4" variant="primary">Proceed</Button>
          </Form>
        </Card.Body>
      </Card>
    </div></div>
  );
}

export default Payment;
