import React, { useState } from 'react';
import './EducationPanel.css';

const EducationPanel = ({ earthquakes, isVisible, onToggle }) => {
  const [activeTab, setActiveTab] = useState('basics');

  const getStats = () => {
    if (!earthquakes.length) return null;
    
    const magnitudes = earthquakes.map(eq => eq.properties.mag).filter(mag => mag !== null && !isNaN(mag));
    const depths = earthquakes.map(eq => eq.geometry.coordinates[2]).filter(depth => depth !== null && !isNaN(depth));
    
    if (magnitudes.length === 0 || depths.length === 0) return null;
    
    return {
      total: earthquakes.length,
      maxMag: Math.max(...magnitudes).toFixed(1),
      avgMag: (magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length).toFixed(1),
      maxDepth: Math.max(...depths).toFixed(1),
      avgDepth: (depths.reduce((a, b) => a + b, 0) / depths.length).toFixed(1),
      shallow: earthquakes.filter(eq => eq.geometry.coordinates[2] <= 50).length,
      intermediate: earthquakes.filter(eq => eq.geometry.coordinates[2] > 50 && eq.geometry.coordinates[2] <= 100).length,
      deep: earthquakes.filter(eq => eq.geometry.coordinates[2] > 100).length
    };
  };

  const stats = getStats();

  const educationContent = {
    basics: {
      title: "Earthquake Basics",
      content: (
        <div>
          <h4>What are Earthquakes?</h4>
          <p>Earthquakes are sudden movements of the Earth's crust caused by the release of energy stored in rocks. They occur when tectonic plates move against each other.</p>
          
          <h4>Magnitude Scale</h4>
          <ul>
            <li><strong>0-2.9:</strong> Micro - Usually not felt</li>
            <li><strong>3.0-3.9:</strong> Minor - Often felt, rarely causes damage</li>
            <li><strong>4.0-4.9:</strong> Light - Noticeable shaking, minimal damage</li>
            <li><strong>5.0-5.9:</strong> Moderate - Can cause damage to buildings</li>
            <li><strong>6.0-6.9:</strong> Strong - Can cause serious damage</li>
            <li><strong>7.0+:</strong> Major/Great - Can cause widespread damage</li>
          </ul>
        </div>
      )
    },
    depth: {
      title: "Earthquake Depth",
      content: (
        <div>
          <h4>Why Depth Matters</h4>
          <p>The depth of an earthquake affects how much shaking is felt at the surface and how much damage it can cause.</p>
          
          <h4>Depth Categories</h4>
          <ul>
            <li><strong>Shallow (0-50 km):</strong> Most dangerous - strong surface shaking</li>
            <li><strong>Intermediate (50-100 km):</strong> Moderate surface effects</li>
            <li><strong>Deep (100+ km):</strong> Less surface shaking, felt over wider area</li>
          </ul>
          
          <p>Shallow earthquakes are generally more destructive because the seismic waves don't have as much distance to travel and lose energy.</p>
        </div>
      )
    },
    safety: {
      title: "Earthquake Safety",
      content: (
        <div>
          <h4>During an Earthquake</h4>
          <ul>
            <li><strong>Drop:</strong> Get on hands and knees</li>
            <li><strong>Cover:</strong> Take shelter under a desk or table</li>
            <li><strong>Hold On:</strong> Hold onto your shelter and protect your head</li>
          </ul>
          
          <h4>Preparation Tips</h4>
          <ul>
            <li>Create an emergency kit with water, food, and supplies</li>
            <li>Identify safe spots in each room</li>
            <li>Practice earthquake drills</li>
            <li>Secure heavy furniture and appliances</li>
            <li>Know how to turn off gas, water, and electricity</li>
          </ul>
        </div>
      )
    }
  };

  if (!isVisible) {
    return (
      <button className="education-toggle" onClick={onToggle}>
        📚 Learn About Earthquakes
      </button>
    );
  }

  return (
    <div className="education-panel">
      <div className="education-header">
        <h3>Earthquake Education</h3>
        <button className="close-btn" onClick={onToggle}>×</button>
      </div>
      
      {stats && (
        <div className="stats-section">
          <h4>Current Data Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Earthquakes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.maxMag}</span>
              <span className="stat-label">Largest Magnitude</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.avgMag}</span>
              <span className="stat-label">Average Magnitude</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.shallow}</span>
              <span className="stat-label">Shallow Quakes</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="education-tabs">
        {Object.keys(educationContent).map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {educationContent[tab].title}
          </button>
        ))}
      </div>
      
      <div className="education-content">
        {educationContent[activeTab].content}
      </div>
    </div>
  );
};

export default EducationPanel;
