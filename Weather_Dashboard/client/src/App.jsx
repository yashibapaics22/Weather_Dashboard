import { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data);
      
      // Update search history
      const newHistory = [
        { city, timestamp: new Date().toISOString() },
        ...searchHistory.filter(item => item.city.toLowerCase() !== city.toLowerCase())
      ].slice(0, 5);
      
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(
        err.response?.data?.message || 
        'Unable to fetch weather data. Please try again.'
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Weather Dashboard</h1>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </header>

      <main>
        <SearchBar onSearch={fetchWeatherData} isLoading={loading} />
        
        {searchHistory.length > 0 && (
          <div className="search-history">
            <h3>Recent Searches</h3>
            <ul>
              {searchHistory.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => fetchWeatherData(item.city)}
                  className="history-item"
                >
                  {item.city}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="content">
          {loading && <LoadingSpinner />}
          
          {error && !loading && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          
          {weatherData && !loading && !error && (
            <WeatherCard weatherData={weatherData} />
          )}
          
          {!weatherData && !loading && !error && (
            <div className="empty-state">
              <p>Enter a city name to get the current weather</p>
            </div>
          )}
        </div>
      </main>
      
      {/* <footer> */}
        {/* <p>Data provided by OpenWeatherMap</p> */}
      {/* </footer> */}
    </div>
  );
}

export default App;