import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gas from "./cheffire.jpg";
import { Navbar,Nav } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('CustomerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItems(cart);

      // Store the gasId of the first item in localStorage
      if (cart.length > 0) {
        localStorage.setItem(`gasId_${userId}`, cart[0].gasId);
      }
    }
  }, [userId]);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);

    // Update the cart in localStorage
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));

    // Store the gasId of the new first item in localStorage
    if (updatedCart.length > 0) {
      localStorage.setItem('gasId', updatedCart[0].gasId);
    } else {
      // Clear the gasId if the cart is empty
      localStorage.removeItem('gasId');
    }

    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const proceedToBuy = () => {
    navigate('/payment');
  };

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
            <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>User Profile</Nav.Link>
            
            <Nav.Link as={Link} to="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
            <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.gasName}</h5>
                      <p className="card-text">Price: ${item.price}</p>
                      <p className="card-text">City: {item.city}</p>
                      <p className="card-text">Address: {item.address}</p>
                      <p className="card-text">Availability: {item.availability}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">Description: {item.description}</p>
                      <button onClick={() => removeFromCart(index)} className="btn btn-danger">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3>Total Price: ${getTotalPrice()}</h3>
            </div>
            <div>
              <button onClick={proceedToBuy} className="btn btn-primary">Proceed to Buy</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
