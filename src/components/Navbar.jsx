import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">MovieBooking</span>
          </Link>
        </div>

        <div className="navbar-menu">
          {currentUser ? (
            <>
              <div className="user-greeting">
                <span className="user-icon">👋</span>
                <span className="user-name">Hi, {currentUser.name}</span>
              </div>
              <Link to="/" className="nav-link">
                🏠 Home
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;