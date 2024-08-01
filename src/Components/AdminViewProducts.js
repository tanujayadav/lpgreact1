import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Importing Font Awesome icons
import gas from "./cheffire.jpg";

function AdminViewProducts() {
  const [gasProducts, setGasProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const fetchGasProducts = () => {
    fetch('https://localhost:7085/api/Gas/GetGases')
      .then(response => response.json())
      .then(data => {
        setGasProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gas products:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGasProducts();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7085/api/Gas/Delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setGasProducts(gasProducts.filter(product => product.gasId !== id));
          alert('Product details deleted successfully!');
        } else {
          console.error('Error deleting gas product:', response);
        }
      })
      .catch(error => {
        console.error('Error deleting gas product:', error);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    fetch(`https://localhost:7085/api/Gas/Update/${selectedProduct.gasId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedProduct)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating gas product');
        }
        return response.json();
      })
      .then(data => {
        setGasProducts(gasProducts.map(product => (product.gasId === selectedProduct.gasId ? selectedProduct : product)));
        setShowEditModal(false);
        alert('Product details updated successfully!');
      })
      .catch(error => {
        console.error('Error updating gas product:', error);
      });
  };

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
            <Nav.Link as={Link} to="/Adminview-dealers" style={{ color: 'white' }}>Dealers</Nav.Link>
           
            <Nav.Link onClick={() => navigate('/adminorders')} style={{ color: 'white' }}>Orders</Nav.Link>
            <Nav.Link onClick={() => navigate('/adminreviews')} style={{ color: 'white' }}>Feedback</Nav.Link>
            <Nav.Link onClick={() => navigate('/login')} style={{ color: 'white' }}>Logout</Nav.Link>
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Gas Name</th>
              <th>Price</th>
              <th>City</th>
              <th>Address</th>
              <th>Availability</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.gasId}>
                <td>{product.gasName}</td>
                <td>${product.price}</td>
                <td>{product.city}</td>
                <td>{product.address}</td>
                <td>{product.availability}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>
                  <button className="btn btn-link p-0 mr-2" onClick={() => handleEdit(product)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-link p-0" onClick={() => handleDelete(product.gasId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/product-form" className="btn btn-primary">Create</Link>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Gas Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Form>
                <Form.Group>
                  <Form.Label>Gas Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.gasName}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, gasName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.city}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, city: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.address}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, address: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Availability</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.availability}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, availability: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedProduct.quantity}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminViewProducts;
