import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-form-bar glass-card">
      <div className="search-form-bar__icon" aria-hidden="true">🔍</div>
      <form className="search-form-bar__form" onSubmit={handleSubmit} role="search">
        <input
          id="hero-search-input"
          type="text"
          className="search-form-bar__input"
          placeholder="Search by name, vehicle no, or mobile…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search bookings"
        />
        <button
          type="submit"
          className="btn btn-primary search-form-bar__btn"
          id="hero-search-submit"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
