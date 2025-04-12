# Weather Dashboard

A modern weather application built with React and Node.js that provides real-time weather information and forecasts.

## Features

- **Current Weather Information**
  - Temperature
  - Weather condition
  - Humidity
  - Wind speed
  - Feels like temperature
  - Weather icon

- **5-Day Weather Forecast**
  - Daily temperature (max/min)
  - Weather condition
  - Humidity
  - Wind speed
  - Weather icons

- **Search Functionality**
  - Search by city name
  - City autocomplete suggestions
  - Recent search history
  - Error handling for invalid cities

- **Theme Support**
  - Light and dark mode
  - Automatic theme detection based on system preferences
  - Smooth theme transitions
  - Persistent theme selection

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layouts for different screen sizes
  - Touch-friendly controls
  - Optimized for both desktop and mobile viewing

- **User Experience**
  - Clean and modern UI
  - Smooth animations and transitions
  - Loading states and error messages
  - Intuitive navigation

## Technologies Used

- **Frontend**
  - React.js
  - Vite
  - CSS3 with custom properties
  - Context API for state management

- **Backend**
  - Node.js
  - Express.js
  - Axios for API requests

- **APIs**
  - OpenWeather API for weather data
  - GeoDB Cities API for city suggestions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key
- GeoDB Cities API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the server directory:
     ```
     OPENWEATHER_API_KEY=your_openweather_api_key
     GEODB_API_KEY=your_geodb_api_key
     ```

4. Start the development servers:
   ```bash
   # Start the server
   cd server
   npm run dev

   # Start the client
   cd ../client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
weather-dashboard/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── App.css        # Global styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenWeather API for weather data
- GeoDB Cities API for city suggestions
- React and Node.js communities
