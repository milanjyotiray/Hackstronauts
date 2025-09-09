import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './modern-styles.css';
import EducationPanel from './components/EducationPanel';
import TimeSlider from './components/TimeSlider';

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [timeframe, setTimeframe] = useState("all_day");
  const [minMag, setMinMag] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showControls, setShowControls] = useState(false);
  const [activeSection, setActiveSection] = useState('map');

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Get depth color based on depth in km
  const getDepthColor = (depth) => {
    if (depth > 100) return "#ff4444"; // red
    if (depth > 50) return "#ffbb33";  // orange
    return "#00C851";                   // green
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <h1>SeismoScope</h1>
          </div>
          <div className="header-right">
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
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowControls(!showControls)}
            aria-label="Toggle controls"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobile ? (showControls ? 'mobile-show' : 'mobile-hide') : ''}`}>
        <div className="mobile-header">
          <h3>Navigation</h3>
          <button 
            className="close-btn"
            onClick={() => setShowControls(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mobile-nav">
          <button 
            className={`mobile-nav-btn ${activeSection === 'map' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('map');
              setShowControls(false);
            }}
          >
            🗺️ Interactive Map
          </button>
          <button 
            className={`mobile-nav-btn ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('education');
              setShowControls(false);
            }}
          >
            📚 Education Center
          </button>
          <button 
            className={`mobile-nav-btn ${activeSection === 'data' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('data');
              setShowControls(false);
            }}
          >
            📊 Data & Controls
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">

        {activeSection === 'education' && (
          <div className="education-section">
            <EducationPanel 
              earthquakes={earthquakes}
              isVisible={true}
              onToggle={() => {}}
            />
          </div>
        )}

        {activeSection === 'data' && (
          <div className="data-section">
            <div className="data-controls">
              <TimeSlider 
                onTimeRangeChange={(range) => setTimeframe(range)}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {activeSection === 'map' && (
          <>
            {/* Controls Panel */}
            <div className="controls-panel">
              <h2>Earthquake Monitor</h2>
              <div className="control-group">
                <div className="form-group">
                  <label htmlFor="timeframe">📅 Time Range</label>
                  <select
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="form-control"
                  >
                    <option value="all_hour">Past Hour</option>
                    <option value="all_day">Past Day</option>
                    <option value="all_week">Past Week</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="minMag">📊 Min Magnitude</label>
                  <div className="magnitude-input">
                    <input
                      id="minMag"
                      type="range"
                      min="0"
                      max="8"
                      step="0.1"
                      value={minMag}
                      onChange={(e) => setMinMag(parseFloat(e.target.value))}
                      className="magnitude-slider"
                    />
                    <span className="magnitude-value">{minMag.toFixed(1)}</span>
                  </div>
                </div>

                <button
                  onClick={fetchData}
                  disabled={isLoading}
                  className="btn"
                >
                  {isLoading ? '⏳ Loading...' : '🔄 Update Data'}
                </button>
              </div>

              {/* Legend */}
              <div className="legend">
                <h4>Depth (km)</h4>
                <div className="legend-item">
                  <span className="legend-color shallow"></span>
                  <span>0-50 km (Shallow)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color intermediate"></span>
                  <span>50-100 km (Intermediate)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color deep"></span>
                  <span>100+ km (Deep)</span>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                className="map-container"
                style={{ height: '100%', width: '100%', zIndex: 1 }}
                key="earthquake-map"
                whenReady={() => {
                  // Map is ready
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {!isLoading && earthquakes
                  .filter((eq) => eq.properties.mag >= minMag)
                  .map((eq) => {
                    if (!eq.geometry || !eq.geometry.coordinates) return null;
                    
                    const [lon, lat, depth] = eq.geometry.coordinates;
                    const mag = eq.properties.mag;
                    const color = getDepthColor(depth);

                    return (
                      <CircleMarker
                        key={eq.id}
                        center={[lat, lon]}
                        radius={Math.max(mag * 3, 4)}
                        pathOptions={{
                          fillColor: color,
                          color: "#000",
                          weight: 1,
                          fillOpacity: 0.7
                        }}
                      >
                        <Popup>
                          <div style={{ minWidth: '200px' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                              {eq.properties.place}
                            </h4>
                            <p><strong>Magnitude:</strong> {mag}</p>
                            <p><strong>Depth:</strong> {depth} km</p>
                            <p><strong>Time:</strong> {new Date(eq.properties.time).toLocaleString()}</p>
                            {eq.properties.tsunami && <p style={{ color: 'red' }}><strong>⚠️ Tsunami Alert</strong></p>}
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}
              </MapContainer>
            </div>
            
            {/* Statistics Panel */}
            <div className="stats-panel">
              <h4>Live Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{earthquakes.length}</span>
                  <span className="stat-label">Total Earthquakes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{earthquakes.filter(eq => eq.properties.mag >= minMag).length}</span>
                  <span className="stat-label">Filtered Results</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{earthquakes.length > 0 ? Math.max(...earthquakes.map(eq => eq.properties.mag)).toFixed(1) : '0'}</span>
                  <span className="stat-label">Largest Magnitude</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{earthquakes.filter(eq => eq.properties.mag >= 4.0).length}</span>
                  <span className="stat-label">Significant (≥4.0)</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading earthquake data...</p>
        </div>
      )}
    </div>
  );
}
