import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdminProfile() {
  const { admin, logout, adminToken } = useAuth();
  const navigate = useNavigate();
  const [recycleRequests, setRecycleRequests] = useState([]);
  const [garbageRequests, setGarbageRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('recycle');
  const [loading, setLoading] = useState(true);

  const adminApi = {
    get: (url) => api.get(url, { headers: { Authorization: `Bearer ${adminToken}` } }),
    post: (url, data) => api.post(url, data, { headers: { Authorization: `Bearer ${adminToken}` } }),
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      const [recycleRes, garbageRes] = await Promise.all([
        adminApi.get('/admin/recycling-requests'),
        adminApi.get('/admin/garbage-requests')
      ]);
      setRecycleRequests(recycleRes.data.requests);
      setGarbageRequests(garbageRes.data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRequests(); }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const updateRecycleStatus = async (id) => {
    try {
      await adminApi.post('/admin/update-recycling-status', { requestId: id });
      loadRequests();
    } catch (err) { console.error(err); }
  };

  const updateGarbageStatus = async (id) => {
    try {
      await adminApi.post('/admin/update-garbage-status', { requestId: id });
      loadRequests();
    } catch (err) { console.error(err); }
  };

  const requests = activeTab === 'recycle' ? recycleRequests : garbageRequests;
  const updateStatus = activeTab === 'recycle' ? updateRecycleStatus : updateGarbageStatus;

  return (
    <div className="admin-profile-page">
      <div className="admin-header">
        <span className="admin-brand">SmartBin <span className="admin-badge">Admin</span></span>
        <button className="logout-btn danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-content">
        <div className="admin-greeting">
          <h3>Hello admin, <span>{admin?.username}</span></h3>
        </div>

        <div className="profile-tabs">
          <button className={`tab-btn ${activeTab === 'recycle' ? 'active' : ''}`} onClick={() => setActiveTab('recycle')}>
            Recycling Requests
          </button>
          <button className={`tab-btn ${activeTab === 'garbage' ? 'active' : ''}`} onClick={() => setActiveTab('garbage')}>
            Garbage Requests
          </button>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <p className="loading-text">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="no-requests">No {activeTab} requests found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td>{req.user?.username}</td>
                    <td>{req.description}</td>
                    <td>{req.location}</td>
                    <td><span className={`status-badge ${req.status}`}>{req.status}</span></td>
                    <td>
                      {req.status === 'pending' ? (
                        <button className="complete-btn" onClick={() => updateStatus(req._id)}>
                          Mark Completed
                        </button>
                      ) : (
                        <span className="completed-label">✓ Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
