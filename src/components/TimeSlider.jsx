import React, { useState, useEffect } from 'react';
import './TimeSlider.css';

const TimeSlider = ({ onTimeRangeChange, isLoading }) => {
  const [selectedRange, setSelectedRange] = useState('all_day');
  const [customDate, setCustomDate] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const timeRanges = [
    { value: 'all_hour', label: 'Past Hour', description: 'Most recent earthquakes' },
    { value: 'all_day', label: 'Past Day', description: 'Last 24 hours' },
    { value: 'all_week', label: 'Past Week', description: 'Last 7 days' }
  ];

  useEffect(() => {
    if (onTimeRangeChange) {
      onTimeRangeChange(selectedRange, customDate);
    }
  }, [selectedRange, customDate, onTimeRangeChange]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    setShowCustom(false);
    setCustomDate('');
  };

  const handleCustomDateChange = (date) => {
    setCustomDate(date);
    setSelectedRange('custom');
    setShowCustom(true);
  };

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return thirtyDaysAgo.toISOString().split('T')[0];
  };

  return (
    <div className="time-slider-container">
      <h4>Time Range Selection</h4>
      
      <div className="time-range-buttons">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            className={`time-btn ${selectedRange === range.value ? 'active' : ''}`}
            onClick={() => handleRangeChange(range.value)}
            disabled={isLoading}
            title={range.description}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="custom-date-section">
        <button
          className={`custom-btn ${showCustom ? 'active' : ''}`}
          onClick={() => setShowCustom(!showCustom)}
          disabled={isLoading}
        >
          📅 Custom Date
        </button>
        
        {showCustom && (
          <div className="custom-date-input">
            <label htmlFor="custom-date">Select specific date:</label>
            <input
              id="custom-date"
              type="date"
              value={customDate}
              onChange={(e) => handleCustomDateChange(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className="date-input"
            />
            <small>Note: Historical data limited to past 30 days</small>
          </div>
        )}
      </div>

      {selectedRange && (
        <div className="selected-info">
          <span className="info-icon">ℹ️</span>
          <span>
            {selectedRange === 'custom' && customDate
              ? `Showing earthquakes from ${new Date(customDate).toLocaleDateString()}`
              : `Showing ${timeRanges.find(r => r.value === selectedRange)?.description || selectedRange}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimeSlider;
