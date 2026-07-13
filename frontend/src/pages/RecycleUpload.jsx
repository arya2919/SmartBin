import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RecycleUpload() {
  const { token } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [locating, setLocating] = useState(false);
  const latRef = useRef(null);
  const lonRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        latRef.current = pos.coords.latitude;
        lonRef.current = pos.coords.longitude;
        setLocating(false);
      },
      () => { setError('Could not get location'); setLocating(false); }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) { setError('Please select an image'); return; }
    if (!latRef.current) { setError('Please share your location first'); return; }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('latitude', latRef.current);
    formData.append('longitude', lonRef.current);

    try {
      await api.post('/upload/recycle', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setSuccess('Recycling request submitted! Our team will collect soon.');
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page recycle-upload">
      <div className="upload-card">
        <Link to="/profile" className="back-link">← Back to Profile</Link>
        <h2>Schedule Recycling Pickup</h2>
        <p className="upload-subtitle">Upload a photo of recyclable items and share your location.</p>

        {success && <div className="upload-success">{success}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="image-drop-zone" onClick={() => document.getElementById('recycle-img').click()}>
            {preview ? (
              <img src={preview} alt="preview" className="image-preview" />
            ) : (
              <div className="drop-zone-placeholder">
                <i className="fas fa-recycle"></i>
                <p>Click to upload image</p>
                <span>JPEG, JPG, PNG — max 10MB</span>
              </div>
            )}
            <input id="recycle-img" type="file" accept="image/*" onChange={handleImageChange} hidden />
          </div>

          <button type="button" className="location-btn recycle" onClick={getLocation} disabled={locating}>
            {locating ? 'Getting location...' : (latRef.current ? '✓ Location captured' : '📍 Share My Location')}
          </button>

          <button type="submit" className="upload-submit-btn recycle" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Recycling Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
