import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Pack Ahead</h1>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <h2>Home</h2>
        </Link>
        <Link to="/profile" className="sidebar-link">
          <h2>Profile</h2>
        </Link>
        <button onClick={handleLogout} className="sidebar-logout">
          <h2>Logout</h2>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
