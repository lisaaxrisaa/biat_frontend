import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css';

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="logout">Logout</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="logout">Logout</Link>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
