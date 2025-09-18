import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LandingPage.css';

const Navbar = ({ onViewProfileClick, onViewParcelsClick }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <Link to="/" className="navbar-logo">DevGo</Link>

      {/* Center: Navigation Links */}
      <div className="navbar-center">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/#about" className="nav-link">About</NavLink>
        {user && (
          <a
            href="#!"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onViewParcelsClick();
            }}
          >
            My Parcels
          </a>
        )}
      </div>

      {/* Right: Profile or Login Button */}
      <div className="navbar-right">
        {user ? (
          <button
            className="btn-primary"
            onClick={onViewProfileClick}
          >
            View Profile
          </button>
        ) : (
          <Link to="/login">
            <button className="btn-primary">
              Login / Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;