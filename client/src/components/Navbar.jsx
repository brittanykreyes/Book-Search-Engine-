import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);  // Clear the logged-in user from state
  };

  return (
    <nav>
      <ul>
        {loggedInUser ? (
          <>
            <li><Link to="/">Search Books</Link></li>
            <li><Link to="/saved">Saved Books</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Search Books</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
