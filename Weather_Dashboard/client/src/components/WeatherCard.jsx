import PropTypes from 'prop-types';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  const { current, forecast } = weatherData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="weather-container">
      <div className="weather-card current-weather">
        <h2>{current.city}</h2>
        <img 
          src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`} 
          alt={current.condition}
          className="weather-icon"
        />
        <div className="temperature">
          {Math.round(current.temperature)}°C
        </div>
        <p className="condition">{current.condition}</p>
        <div className="details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{current.wind_speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(current.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{current.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div className="forecast-container">
        <h3>5-Day Forecast</h3>
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <p className="forecast-date">{formatDate(day.date)}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                alt={day.condition}
                className="forecast-icon"
              />
              <div className="forecast-temp">
                <span className="max-temp">{Math.round(day.max_temp)}°</span>
                <span className="min-temp">{Math.round(day.min_temp)}°</span>
              </div>
              <p className="forecast-condition">{day.condition}</p>
              <div className="forecast-details">
                <span>H: {day.humidity}%</span>
                <span>W: {day.windSpeed}m/s</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    current: PropTypes.shape({
      city: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      humidity: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired
    }).isRequired,
    forecast: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        max_temp: PropTypes.number.isRequired,
        min_temp: PropTypes.number.isRequired,
        condition: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        windSpeed: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default WeatherCard;