import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('garbage');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    api.get('/user/profile')
      .then(res => setProfileData(res.data.user))
      .catch(() => { logout(); navigate('/login'); });
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const currentRequests = activeTab === 'garbage'
    ? (profileData?.garbageRequests || [])
    : (profileData?.recycleRequests || []);

  const totalPages = Math.ceil(currentRequests.length / itemsPerPage);
  const paginated = currentRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="profile-page">
      {/* Navbar */}
      <nav className="profile-nav">
        <span className="profile-nav-brand">SmartBin</span>
        <div className="profile-nav-actions">
          <div className="profile-avatar-wrap">
            <button className="profile-avatar-btn" onClick={() => setShowMenu(!showMenu)}>
              <img src={`/images/${profileData?.profilePic || 'user2.png'}`} alt="profile" />
            </button>
            {showMenu && (
              <div className="profile-menu">
                <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
                <Link to="/garbage-upload" onClick={() => setShowMenu(false)}>Report Garbage</Link>
                <Link to="/recycle-upload" onClick={() => setShowMenu(false)}>Recycle</Link>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-greeting fade-in">
          <h3><span className="light">Hello,</span> <span className="bold">{profileData?.username || user?.username}</span></h3>
        </div>

        {/* Tabs */}
        <div className="profile-tabs fade-in">
          <button
            className={`tab-btn ${activeTab === 'garbage' ? 'active' : ''}`}
            onClick={() => { setActiveTab('garbage'); setCurrentPage(1); }}
          >
            Garbage Requests
          </button>
          <button
            className={`tab-btn ${activeTab === 'recycle' ? 'active' : ''}`}
            onClick={() => { setActiveTab('recycle'); setCurrentPage(1); }}
          >
            Recycle Requests
          </button>
        </div>

        <h2 className="profile-table-title fade-in">
          {activeTab === 'garbage' ? 'Your Garbage Requests' : 'Your Recycle Requests'}
        </h2>

        <div className="profile-table-wrap fade-in">
          {currentRequests.length === 0 ? (
            <p className="no-requests">
              {activeTab === 'garbage'
                ? "You haven't made any garbage requests yet."
                : "You haven't made any recycle requests yet."}
            </p>
          ) : (
            <table className="profile-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((req, i) => (
                  <tr key={req._id}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>{new Date(req.date || req.createdAt).toLocaleDateString()}</td>
                    <td>{req.description}</td>
                    <td>{req.location}</td>
                    <td>
                      <span className={`status-badge ${req.status}`}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination fade-in">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        )}

        {activeTab === 'garbage' ? (
          <Link to="/garbage-upload" className="report-btn fade-in">Report New Garbage</Link>
        ) : (
          <Link to="/recycle-upload" className="report-btn fade-in">Report New Items to Recycle</Link>
        )}
      </div>
    </div>
  );
}
