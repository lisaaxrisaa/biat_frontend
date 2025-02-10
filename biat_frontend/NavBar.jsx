import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {user && <Link to="/profile">Profile</Link>}
      </nav>
    </>
  );
};

export default NavBar;
