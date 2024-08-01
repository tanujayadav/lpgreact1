import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SignupForm from './Components/SignupForm';
import Login from './Components/Login';
import DealerForm from './Components/DealerForm';
import Home from './Components/Home';
import ProductForm from './Components/ProductForm';
import ViewProducts from './Components/ViewProducts';
import AdminViewProducts from './Components/AdminViewProducts';
import UserProfile from './Components/UserProfile';
import Cart from './Components/Cart';
import AdminViewDealers from './Components/AdminViewDealers';
import Payment from './Components/Payment';
import OrderConfirmation from './Components/OrderConfirmation';
import Orders from './Components/Orders';
import AdminOrders from './Components/AdminOrders';
import AdminReviews from './Components/AdminReviews';


function App() {

  const [role,setRole] = useState(null);
  const role1=localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignupForm />} />
        <Route path="/login" element={<Login setRole={setRole}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/dealer-form" element={<DealerForm />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Adminview-dealers" element={<AdminViewDealers />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/adminorders" element={<AdminOrders />} />
        <Route path="/adminreviews" element={<AdminReviews />} />
        <Route path="/Products" element={role==="Admin" || role1==="Admin" ?<AdminViewProducts/>: <ViewProducts/>}></Route>

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
