# 🌍 SeismoScope - Earthquake Visualization Tool

A modern, responsive web application for real-time earthquake monitoring and visualization built with React and Leaflet. Perfect for educational purposes, research, and staying informed about seismic activity worldwide.

![SeismoScope Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-purple)

## ✨ Features

### 🗺️ Interactive Map View
- **Real-time earthquake data** from USGS GeoJSON API
- **Interactive world map** with zoom and pan capabilities
- **Color-coded markers** by earthquake depth (shallow, intermediate, deep)
- **Size-scaled markers** based on earthquake magnitude
- **Detailed popups** with location, magnitude, depth, and time information
- **Tsunami alerts** for applicable earthquakes

### 📊 Advanced Filtering & Controls
- **Time range selection**: Past hour, day, or week
- **Magnitude filtering**: Adjustable minimum magnitude threshold
- **Real-time updates** with loading states and error handling
- **Legend** explaining depth color coding

### 📱 Responsive Design
- **Desktop**: Three-column layout (Controls | Map | Statistics)
- **Mobile & Tablet**: Hamburger menu with full-screen sections
- **Touch-friendly** controls with proper sizing
- **Glassmorphism UI** with modern gradient styling

### 📚 Educational Content
- **Earthquake basics** and formation explanations
- **Depth classification** information
- **Safety guidelines** and preparedness tips
- **Interactive statistics** panel with live data

### 📈 Live Statistics
- Total earthquake count
- Filtered results display
- Largest magnitude tracking
- Significant earthquakes (≥4.0) counter

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20.19+)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackstronauts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Mapping**: React Leaflet + Leaflet
- **Styling**: Modern CSS with Glassmorphism
- **Data Source**: USGS Earthquake GeoJSON API
- **Icons**: Unicode Emojis
- **Typography**: Google Fonts (Inter)

## 📱 Device Compatibility

### Desktop/Laptop (1025px+)
- Three-column layout with dedicated panels
- Full navigation bar
- Optimal map visibility
- Side-by-side controls and statistics

### Tablet (769px - 1024px)
- Responsive layout adjustments
- Touch-optimized controls
- Proper spacing and sizing

### Mobile (≤768px)
- Hamburger menu navigation
- Full-screen sections
- Touch-friendly interface
- Minimum 44px touch targets

## 🎨 Design Features

- **Glassmorphism Effects**: Modern translucent panels
- **Gradient Typography**: Eye-catching text styling
- **Smooth Animations**: Hover effects and transitions
- **Professional Color Scheme**: Blue gradients with white accents
- **Accessibility**: Proper contrast ratios and touch targets

## 🌐 API Integration

The application uses the USGS Earthquake Hazards Program API:
- **Base URL**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/`
- **Data Format**: GeoJSON
- **Update Frequency**: Real-time
- **Coverage**: Global earthquake data

### Available Time Ranges
- `all_hour.geojson` - Past hour
- `all_day.geojson` - Past day  
- `all_week.geojson` - Past week

## 📂 Project Structure

```
Hackstronauts/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── EducationPanel.jsx
│   │   ├── EducationPanel.css
│   │   ├── TimeSlider.jsx
│   │   └── TimeSlider.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── modern-styles.css
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables
No environment variables required - the app uses public USGS APIs.

### Vite Configuration
Standard React + Vite setup with no custom modifications needed.

## 🐛 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check internet connection
   - Verify USGS API accessibility
   - Clear browser cache

2. **Permission errors on macOS**
   ```bash
   chmod +x node_modules/.bin/vite
   ```

3. **Node.js compatibility**
   - Ensure Node.js 18+ is installed
   - Consider upgrading to Node.js 20.19+ for optimal Vite performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **USGS Earthquake Hazards Program** for providing real-time earthquake data
- **OpenStreetMap** contributors for map tiles
- **React Leaflet** community for mapping components
- **Vite** team for the excellent build tool

## 📊 Presentation

### Hackathon Presentation
This project was developed for the **Hackstronauts** hackathon with a focus on creating an accessible and educational earthquake visualization tool.

#### 🎯 Key Presentation Points
- **Problem Statement**: Need for accessible, real-time earthquake data visualization
- **Solution**: Modern web app with educational content and responsive design
- **Technology Stack**: React 19, Leaflet, USGS API integration
- **User Experience**: Three-column desktop layout, mobile-first responsive design
- **Educational Value**: Built-in learning modules about earthquakes and safety
- **Real-time Data**: Live USGS earthquake feed integration
- **Accessibility**: Touch-friendly controls, proper contrast ratios

#### 📋 Demo Flow
1. **Interactive Map**: Show real-time earthquake visualization with filtering
2. **Educational Content**: Demonstrate learning modules and safety information
3. **Responsive Design**: Show mobile, tablet, and desktop layouts
4. **Data Controls**: Time range and magnitude filtering capabilities
5. **Statistics Panel**: Live earthquake statistics and insights

#### 🎨 Visual Highlights
- Modern glassmorphism UI design
- Gradient typography and smooth animations
- Color-coded earthquake depth visualization
- Size-scaled magnitude representation
- Professional three-column desktop layout

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Contact the development team
- Check the troubleshooting section above

---

**Built with ❤️ for the Hackstronauts hackathon**

*Real-time earthquake visualization made accessible and beautiful.*
