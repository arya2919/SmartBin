import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, admin, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">SmartBin</Link>

      <div className="navbar-links">
        <a href="#page1">Home</a>
        <a href="#page2">Services</a>
        <a href="#page3">About</a>
        <a href="#page4">Impact</a>
      </div>

      <div className="navbar-actions">
        {user || admin ? (
          <div className="nav-user-menu">
            <button className="nav-profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src="/images/user2.png" alt="profile" />
              <span>{user?.username || admin?.username}</span>
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown">
                {user && <Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link>}
                {admin && <Link to="/admin/profile" onClick={() => setDropdownOpen(false)}>Admin Panel</Link>}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-auth-menu">
            <div className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src="/images/user2.png" alt="profile" />
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>User Login</Link>
                  <Link to="/admin/login" onClick={() => setDropdownOpen(false)}>Admin Login</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
