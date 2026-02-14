import React, { useState } from 'react';
import { Leaf, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setIsOpen(false);
    if (!user) {
      navigate('/');
    } else if (user.role === 'Admin') {
      navigate('/admindiscovery');
    } else {
      navigate('/discovery');
    }
  };

  const handleLogout = () => {
    setIsOpen(false);
    setIsModalOpen(false);
    logout();
    navigate('/');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="glass-morphism navbar">
      <div onClick={handleLogoClick} className="nav-brand">
        <Leaf
          size={32}
          style={{ color: 'var(--primary-light)' }}
        />
        <span>
          Canna<span style={{ color: 'var(--primary-light)' }}>Discovery</span>
        </span>
      </div>

      <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {!user && (
          <Link to="/login" className="btn-primary" onClick={closeMenu}>
            <User size={18} />
            Sign In
          </Link>
        )}
        {user && user.role && user.role.toLowerCase() === 'admin' && (
          <>
            <Link to="/admindiscovery" className="nav-item" onClick={closeMenu}>
              Dashboard
            </Link>
            <Link to="/add-product" className="nav-item" onClick={closeMenu}>
              Manage Products
            </Link>
            <Link to="/categories" className="nav-item" onClick={closeMenu}>
              Manage Categories
            </Link>
            <Link to="/users" className="nav-item" onClick={closeMenu}>
              Users List
            </Link>
            <button
              onClick={handleModalOpen}
              className="nav-item logout-btn"
            >
              Logout
            </button>
          </>
        )}
        {user && user.role && user.role.toLowerCase() === 'user' && (
          <>
            <Link to="/discovery" className="nav-item" onClick={closeMenu}>
              Discovery
            </Link>
            <Link to="/wishlist" className="nav-item" onClick={closeMenu}>
              Wishlist
            </Link>
            <button
              onClick={handleModalOpen}
              className="nav-item logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout"
        message={`Are you sure you want to logout?`}
      />
    </nav>
  );
};

export default Navbar;
