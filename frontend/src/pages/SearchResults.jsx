import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch {
      alert('Failed to delete booking.');
    }
  };

  return (
    <main className="page-wrapper search-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Search</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Find <span className="gradient-text">Bookings</span>
          </h1>
          <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
            Search by name, vehicle number, or mobile number.
          </p>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="container search-body">
        {/* Search Form */}
        <form className="search-input-row glass-card anim-fade-up" onSubmit={handleSearch}>
          <input
            id="search-query-input"
            type="text"
            className="form-input search-input-row__input"
            placeholder="Search name, vehicle no, mobile…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" id="search-submit-btn" disabled={loading}>
            {loading ? '⏳' : '🔍'} Search
          </button>
        </form>

        {/* Results */}
        {loading && <div className="search-state">Searching…</div>}

        {!loading && searched && bookings.length === 0 && (
          <div className="search-state glass-card">
            <p style={{ fontSize: '2rem' }}>🔍</p>
            <p>No bookings found for <strong>"{query}"</strong></p>
            <Link to="/booking/add" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
              + Add New Booking
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="booking-results">
            <p className="booking-results__count">
              Found <strong>{bookings.length}</strong> booking{bookings.length !== 1 ? 's' : ''}
            </p>
            <div className="booking-cards">
              {bookings.map((b) => (
                <div key={b._id} className="booking-result-card glass-card">
                  <div className="booking-result-card__header">
                    <div>
                      <h3 className="booking-result-card__name">{b.fullName}</h3>
                      <span className="badge badge-primary">{b.packageType}</span>
                    </div>
                    <div className="booking-result-card__actions">
                      <Link to={`/booking/edit/${b._id}`} className="btn btn-ghost btn-sm" id={`edit-btn-${b._id}`}>
                        ✏️ Edit
                      </Link>
                      <button className="btn btn-danger btn-sm" id={`delete-btn-${b._id}`} onClick={() => handleDelete(b._id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <div className="booking-result-card__details">
                    <span>📍 {b.washingPoint}</span>
                    <span>📞 {b.mobileNo}</span>
                    <span>🚗 {b.vehicleNo || '—'}</span>
                    <span>📅 {b.washDate}</span>
                    <span>🕐 {b.washTime}</span>
                  </div>
                  {b.message && (
                    <p className="booking-result-card__note">📝 {b.message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchResults;
