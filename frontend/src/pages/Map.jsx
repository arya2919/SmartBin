import { Link } from 'react-router-dom';

export default function Map() {
  return (
    <div className="map-page">
      <div className="map-header">
        <Link to="/" className="back-link">← Back</Link>
        <h2>Nearest Centers Map</h2>
      </div>
      <div className="map-container">
        <iframe
          title="SmartBin Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=85.8&lat=20.46&lon=85.88&zoom=14&layer=mapnik"
        />
      </div>
    </div>
  );
}
