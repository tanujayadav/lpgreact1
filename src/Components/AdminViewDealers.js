import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';  // Importing Font Awesome icons
import gas from "./cheffire.jpg";
import { FaArrowLeft } from 'react-icons/fa';

import { Navbar, Nav } from 'react-bootstrap';

function AdminViewDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const navigate = useNavigate();

  const fetchDealers = () => {
    fetch('https://localhost:7085/api/Dealer/GetDealer')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setDealers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dealers:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://localhost:7085/api/Dealer/Delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setDealers(dealers.filter(dealer => dealer.dealerId !== id));
        } else {
          console.error('Error deleting dealer:', response);
        }
      })
      .catch(error => {
        console.error('Error deleting dealer:', error);
      });
  };

  const handleEdit = (dealer) => {
    setSelectedDealer(dealer);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    fetch(`https://localhost:7085/api/Dealer/Update/${selectedDealer.dealerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedDealer)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating dealer');
        }
        return response.json();
      })
      .then(data => {
        setDealers(dealers.map(dealer => (dealer.dealerId === selectedDealer.dealerId ? selectedDealer : dealer)));
        setShowEditModal(false);
      })
      .catch(error => {
        console.error('Error updating dealer:', error);
      });
  };

  const filteredDealers = dealers.filter(dealer => dealer.city.toLowerCase().includes(searchCity.toLowerCase()));

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const handleSignup = () => {
    navigate('/dealer-form');
  }

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
        <h2>Dealers</h2>
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
              <th>Dealer Name</th>
              <th>City</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDealers.map(dealer => (
              <tr key={dealer.dealerId}>
                <td>{dealer.dealerName}</td>
                <td>{dealer.city}</td>
                <td>{dealer.phone}</td>
                <td>
                  <button className="btn btn-link p-0 mr-2" onClick={() => handleEdit(dealer)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-link p-0" onClick={() => handleDelete(dealer.dealerId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <Button onClick={handleSignup} className="btn btn-primary" style={{ marginRight: '10px' }}>
            Create
          </Button>
         
        </div>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Dealer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDealer && (
              <Form>
                <Form.Group>
                  <Form.Label>Dealer Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDealer.dealerName}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, dealerName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDealer.city}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, city: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDealer.phone}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, phone: e.target.value })}
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

export default AdminViewDealers;
