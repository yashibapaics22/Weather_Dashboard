# Weather Dashboard

A full-stack real-time weather application built with React (Vite) and Node.js/Express.

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature
  - Weather condition with icon
  - Humidity
  - Wind speed
- Responsive design
- Error handling for invalid cities or API issues

## Technology Stack

### Frontend
- React (built with Vite)
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express
- OpenWeatherMap API

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- OpenWeatherMap API key (get one at [https://openweathermap.org/api](https://openweathermap.org/api))

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install backend dependencies
```
cd server
npm install
```

3. Create a `.env` file in the server directory with your API key
```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
```

4. Install frontend dependencies
```
cd ../client
npm install
```

### Running the Application

1. Start the backend server
```
cd server
npm run dev
```

2. In a new terminal, start the frontend development server
```
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Folder Structure

```
weather-dashboard/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js Backend
│   ├── routes/
│   │   └── weather.js     # Weather API endpoints
│   ├── server.js          # Express server setup
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

- `GET /api/weather?city={cityname}` - Get current weather for a specific city

## License

MIT