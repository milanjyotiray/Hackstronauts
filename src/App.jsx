import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './styles.css';
import EducationPanel from './components/EducationPanel';
import TimeSlider from './components/TimeSlider';

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [timeframe, setTimeframe] = useState("all_day");
  const [minMag, setMinMag] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('map');
  const [showEducation, setShowEducation] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${timeframe}.geojson`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setEarthquakes(data.features);
    } catch (err) {
      console.error("Error fetching earthquake data:", err);
      setError("Failed to fetch earthquake data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getDepthColor = (depth) => {
    if (depth > 100) return "#dc2626"; // red
    if (depth > 50) return "#f59e0b";  // orange
    return "#10b981";                   // green
  };

  const filteredEarthquakes = earthquakes.filter(eq => eq.properties.mag >= minMag);
  const maxMagnitude = earthquakes.length > 0 ? Math.max(...earthquakes.map(eq => eq.properties.mag)) : 0;
  const significantCount = earthquakes.filter(eq => eq.properties.mag >= 4.0).length;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <h1>SeismoScope</h1>
            <span className="tagline">Real-time Earthquake Monitoring</span>
          </div>
          <nav className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'map' ? 'active' : ''}`}
              onClick={() => setActiveSection('map')}
            >
              🗺️ Map
            </button>
            <button 
              className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => setActiveSection('education')}
            >
              📚 Education
            </button>
            <button 
              className={`nav-link ${activeSection === 'data' ? 'active' : ''}`}
              onClick={() => setActiveSection('data')}
            >
              📊 Data
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {activeSection === 'map' && (
        <div className="map-fullscreen">
          {/* Floating Controls */}
          <div className="floating-controls">
            <div className="control-group">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="control-select"
              >
                <option value="all_hour">Past Hour</option>
                <option value="all_day">Past Day</option>
                <option value="all_week">Past Week</option>
                <option value="all_month">Past Month</option>
              </select>
              
              <div className="magnitude-control">
                <label>Mag: {minMag.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.1"
                  value={minMag}
                  onChange={(e) => setMinMag(parseFloat(e.target.value))}
                  className="control-slider"
                />
              </div>
              
              <button 
                onClick={fetchData} 
                className="control-btn" 
                disabled={isLoading}
              >
                {isLoading ? '⟳' : '🔄'}
              </button>
            </div>
          </div>

          {/* Floating Legend */}
          <div className="floating-legend">
            <h4>Depth</h4>
            <div className="legend-item">
              <span className="legend-dot shallow"></span>
              <span>0-50km</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot intermediate"></span>
              <span>50-100km</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot deep"></span>
              <span>100+km</span>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="floating-stats">
            <div className="stat-item">
              <span className="stat-number">{earthquakes.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredEarthquakes.length}</span>
              <span className="stat-label">Filtered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{maxMagnitude.toFixed(1)}</span>
              <span className="stat-label">Max Mag</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{significantCount}</span>
              <span className="stat-label">≥4.0</span>
            </div>
          </div>

          {/* Full Screen Map */}
          <div className="map-container-full">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <MapContainer
              center={[20, 0]}
              zoom={2}
              className="map-full"
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredEarthquakes.map((eq) => {
                const [lng, lat, depth] = eq.geometry.coordinates;
                const { mag, place, time } = eq.properties;
                const color = getDepthColor(depth);
                const radius = Math.max(3, mag * 3);
                
                return (
                  <CircleMarker
                    key={eq.id}
                    center={[lat, lng]}
                    radius={radius}
                    pathOptions={{ 
                      color: color, 
                      fillColor: color, 
                      fillOpacity: 0.7,
                      weight: 2
                    }}
                  >
                    <Popup>
                      <div className="popup-content">
                        <h4>{place}</h4>
                        <p><strong>Magnitude:</strong> {mag}</p>
                        <p><strong>Depth:</strong> {depth} km</p>
                        <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Education Section */}
      {activeSection === 'education' && (
        <div className="education-section">
          <EducationPanel 
            earthquakes={earthquakes}
            isVisible={true}
            onToggle={() => setShowEducation(!showEducation)}
          />
        </div>
      )}

      {/* Data Section */}
      {activeSection === 'data' && (
        <div className="data-section">
          <div className="data-container">
            <div className="data-controls">
              <h2>Advanced Controls</h2>
              <TimeSlider 
                onTimeRangeChange={(range) => setTimeframe(range)}
                isLoading={isLoading}
              />
            </div>
            
            <div className="data-table">
              <h2>Earthquake Data Table</h2>
              <div className="table-container">
                <table className="earthquake-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Magnitude</th>
                      <th>Depth (km)</th>
                      <th>Coordinates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEarthquakes.slice(0, 50).map((eq) => (
                      <tr key={eq.id}>
                        <td>{new Date(eq.properties.time).toLocaleString()}</td>
                        <td>{eq.properties.place}</td>
                        <td className="magnitude">{eq.properties.mag}</td>
                        <td>{eq.geometry.coordinates[2]}</td>
                        <td>
                          {eq.geometry.coordinates[1].toFixed(3)}, {eq.geometry.coordinates[0].toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
