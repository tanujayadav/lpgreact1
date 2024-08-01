import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { Navbar, Nav } from 'react-bootstrap';
import gas from "./cheffire.jpg";

function ViewProducts() {
  const [gasProducts, setGasProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7085/api/Gas/GetGases')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setGasProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gas products:', error);
        setLoading(false);
      });
  }, []);

  const userId = localStorage.getItem('CustomerId'); // Retrieve user ID from localStorage

  const addToCart = (item) => {
    if (item.availability.toLowerCase() === 'no') {
      alert('Item not available');
      return;
    }
    
    if (userId) {
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      cart.push(item);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
      alert('Item added to cart');
    } else {
      alert('Please log in first');
    }
  };

  // Filter products based on the search input
  const filteredProducts = gasProducts.filter(product => product.city.toLowerCase().includes(searchCity.toLowerCase()));

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="black" variant="light" expand="lg">
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

      <div className="container mt-4">
        <h2>Gas Products</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product.gasId} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.gasName}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">City: {product.city}</p>
                  <p className="card-text">Address: {product.address}</p>
                  <p className="card-text">Availability: {product.availability}</p>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <p className="card-text">Description: {product.description}</p>
                  <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
