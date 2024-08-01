import React, { useState, useEffect } from 'react';
import gas from "./cheffire.jpg";
import { Navbar,Nav } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';

function OrderConfirmation() {
  const [reviewText, setReviewText] = useState('');
  const [selectedGasName, setSelectedGasName] = useState('bharat gas');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('CustomerId');

  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCartItems(cart);
  }, [userId]);

  const styles = {
    container: {
      marginTop: '120px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '80%',
      maxWidth: '600px',
      margin: 'auto',
    },
    header: {
      color: '#333',
      marginBottom: '20px',
    },
    paragraph: {
      color: '#666',
      fontSize: '16px',
    },
    feedbackContainer: {
      marginTop: '20px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#e9e9e9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      padding: '10px 20px',
      backgroundColor: '#cccccc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'not-allowed',
    },
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleGasNameChange = (event) => {
    setSelectedGasName(event.target.value);
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

   // if (cartItems.length === 0) {
   //   alert('No items in the cart to submit a review for.');
   //   return;
   // }

   const customerId=localStorage.getItem('CustomerId');



    const review = {
      userId:  customerId,
      // Assuming gasId is stored correctly elsewhere
      gasName: selectedGasName,
      reviewText: reviewText,
    };

    try {
      const response = await fetch('https://localhost:7085/api/Review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      console.log('Feedback submitted:', review);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
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
        <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
        <Nav.Link as={Link} to="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
        <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
      <div>
      <div style={styles.container}>
        <h2 style={styles.header}>Order Confirmation</h2>
        <p style={styles.paragraph}>Your order has been placed successfully!</p>
        {!isSubmitted ? (
          <div style={styles.feedbackContainer}>
            <h3 style={styles.header}>We value your feedback!</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <select value={selectedGasName} onChange={handleGasNameChange} style={styles.input}>
                <option value="bharat gas">Bharat Gas</option>
                <option value="indian gas">Indian Gas</option>
                <option value="indane gas">Indane Gas</option>
                <option value="hp gas">HP Gas</option>
              </select>
              <textarea
                style={styles.input}
                placeholder="Please provide your feedback here..."
                value={reviewText}
                onChange={handleReviewTextChange}
                required
              />
              <button type="submit" style={reviewText ? styles.button : styles.buttonDisabled} disabled={!reviewText}>
                Submit Feedback
              </button>
            </form>
          </div>
        ) : (
          <div style={styles.feedbackContainer}>
            <h3 style={styles.header}>Thank you for your feedback!</h3>
            <p style={styles.paragraph}>We appreciate your input and will use it to improve our service.</p>
          </div>
        )}
      </div></div>
    </div>
  );
}

export default OrderConfirmation;


