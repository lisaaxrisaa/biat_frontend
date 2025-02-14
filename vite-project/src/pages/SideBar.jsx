import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
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
        <Link to="/logout" className="sidebar-logout">
          <h2>Logout</h2>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
