import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}&limit=5`,
          {
            headers: {
              'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
          }
        );

        const data = await response.json();
        setSuggestions(data.data || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setError('');
    onSearch(city);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          disabled={isLoading}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion.name}, {suggestion.countryCode}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SearchBar;