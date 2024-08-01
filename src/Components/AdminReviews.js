import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import gas from "./cheffire.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7085/api/Review/GetReviewBySignupId?id=1')
      .then(response => response.json())
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const tableContainerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1rem',
  };

  const tableStyle = {
    width: '100%',
    margin: '0 auto',
  };

  const tableCellStyle = {
    padding: '0.5rem',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '1rem',
  };

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
            <Nav.Link as={Link} to="/Adminview-dealers" style={{ color: 'white' }}>Dealers</Nav.Link>
            <Nav.Link onClick={() => navigate('/adminorders')} style={{ color: 'white' }}>Orders</Nav.Link>
            <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">
        <h2 style={headingStyle}>User Reviews</h2>
        <div className="card" style={tableContainerStyle}>
          <div className="card-body">
            {reviews.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              <table className="table table-striped table-hover" style={tableStyle}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={tableCellStyle}>Gas Name</th>
                    <th scope="col" style={tableCellStyle}>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.reviewId}>
                      <td style={tableCellStyle} className="text-nowrap">{review.gasName}</td>
                      <td style={tableCellStyle} className="text-nowrap">{review.reviewText}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="text-left mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
        </div>
      </div>
    </div>
  );
}

export default AdminReviews;
