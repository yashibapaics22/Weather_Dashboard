const express = require('express');
const axios = require('axios');
const router = express.Router();
const NodeCache = require('node-cache');

// Initialize cache with 10-minute TTL
const cache = new NodeCache({ stdTTL: 600 });

// Input validation middleware
const validateCity = (req, res, next) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({
      status: 'error',
      message: 'City parameter is required'
    });
  }

  // Basic input sanitization
  if (!/^[a-zA-Z\s-]+$/.test(city)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid city name. Only letters, spaces, and hyphens are allowed.'
    });
  }

  next();
};

router.get('/weather', validateCity, async (req, res) => {
  const { city } = req.query;
  
  try {
    // Check cache first
    const cachedData = cache.get(city);
    if (cachedData) {
      return res.json(cachedData);
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'API key is not configured'
      });
    }

    // Fetch current weather
    const currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { timeout: 5000 }
    );

    // Fetch 5-day forecast
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { timeout: 5000 }
    );

    // Extract and format current weather data
    const currentWeather = {
      city: currentResponse.data.name,
      temperature: currentResponse.data.main.temp,
      condition: currentResponse.data.weather[0].description,
      icon: currentResponse.data.weather[0].icon,
      humidity: currentResponse.data.main.humidity,
      windSpeed: currentResponse.data.wind.speed,
      timestamp: new Date().toISOString()
    };

    // Extract and format forecast data
    const forecast = forecastResponse.data.list
      .filter((item, index) => index % 8 === 0) // Get one forecast per day
      .map(item => ({
        date: new Date(item.dt * 1000).toISOString(),
        temperature: item.main.temp,
        condition: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed
      }));

    const weatherData = {
      current: currentWeather,
      forecast
    };

    // Cache the response
    cache.set(city, weatherData);

    res.json(weatherData);
  } catch (error) {
    console.error('OpenWeatherMap API error:', error.response?.data || error.message);
    
    // Handle specific API errors
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({
          status: 'error',
          message: 'City not found'
        });
      }
      if (error.response.status === 401) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid API key'
        });
      }
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        status: 'error',
        message: 'Request timeout. Please try again.'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch weather data'
    });
  }
});

module.exports = router;