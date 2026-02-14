import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import SignUp from './pages/SignUp/signup';
import Discovery from './pages/Discovery/discovery';
import Login from './pages/Login/login';
import AdminDiscovery from './pages/AdminDiscovery/admin';
import Category from './pages/Category/category';
import AddProduct from './pages/ProductAdd/addproduct';
import ProductDetails from './pages/ProductDetail/productdetails';
import WishList from './pages/wishList/wishlist';
import User from './pages/Userlist/user';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" element={<User />} />
            <Route path="/admindiscovery" element={<AdminDiscovery />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
