// Home.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import DealerForm from './DealerForm';
import ProductForm from './ProductForm';
import ViewProducts from './ViewProducts';
import AdminViewProducts from './AdminViewProducts';
import AdminViewDealers from './AdminViewDealers';

function Home() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dealer-form">Dealer Signup</Link>
        <br/>
        <Link to="/product-form">Product registration</Link>
        <br/>
        <Link to="/view-products">GasDetails</Link>
        <br/>
        <Link to="/Adminview-products">Admin GasDetails</Link>
        <br/>
        <Link to="/Adminview-dealers">Admin Dealer Details</Link>

        

       
        <br/>
      </nav>
      <Routes>
        <Route path="/dealer-form" element={<DealerForm />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/view-products" element={<ViewProducts />} />
        <Route path="/Adminview-products" element={<AdminViewProducts />} />
        <Route path="/Adminview-dealers" element={<AdminViewDealers />} />
       
       
      </Routes>
    </div>
  );
}

export default Home;
