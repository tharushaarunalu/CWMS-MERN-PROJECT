import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, today: 0, revenue: 0, pending: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // Fetch stats
    fetch('http://localhost:5000/api/bookings')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const today = new Date().toISOString().split('T')[0];
          setStats({
            total: data.length,
            today: data.filter((b) => b.washDate === today).length,
            pending: data.filter((b) => b.status === 'pending' || !b.status).length,
            revenue: data.length * 1500,
          });
          setRecentBookings(data.slice(-5).reverse());
        }
      })
      .catch(() => { });
  }, []);

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: '📋', color: 'var(--clr-primary)' },
    { label: "Today's Wash", value: stats.today, icon: '🚗', color: 'hsl(155, 70%, 55%)' },
    { label: 'Pending', value: stats.pending, icon: '⏳', color: 'var(--clr-gold)' },
    { label: 'Est. Revenue', value: `LKR ${stats.revenue.toLocaleString()}`, icon: '💰', color: 'var(--clr-accent)' },
  ];

  return (
    <main className="page-wrapper admin-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Management Panel</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="container admin-body">
        {/* Stat Cards */}
        <div className="admin-stats">
          {statCards.map(({ label, value, icon, color }, i) => (
            <div
              key={label}
              className={`admin-stat-card glass-card anim-fade-up anim-fade-up-delay-${i + 1}`}
              style={{ '--stat-color': color }}
            >
              <div className="admin-stat-card__icon">{icon}</div>
              <div className="admin-stat-card__value">{value}</div>
              <div className="admin-stat-card__label">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="admin-actions glass-card anim-fade-up anim-fade-up-delay-3">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="admin-action-grid">
            <Link to="/booking/add" className="admin-action btn btn-primary" id="admin-add-booking">
              ➕ New Booking
            </Link>
            <Link to="/search" className="admin-action btn btn-ghost" id="admin-search-btn">
              🔍 Search Bookings
            </Link>
            <Link to="/plans" className="admin-action btn btn-ghost" id="admin-plans-btn">
              📦 Manage Plans
            </Link>
            <Link to="/washing-points" className="admin-action btn btn-ghost" id="admin-locations-btn">
              📍 Locations
            </Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="admin-recent glass-card anim-fade-up anim-fade-up-delay-4">
          <div className="admin-recent__header">
            <h2 className="admin-section-title">Recent Bookings</h2>
            <Link to="/search" className="btn btn-ghost btn-sm">View All →</Link>
          </div>

          {recentBookings.length === 0 ? (
            <p style={{ color: 'var(--clr-text-muted)', padding: 'var(--space-lg) 0' }}>
              No bookings yet. <Link to="/booking/add">Add one!</Link>
            </p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Package</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.fullName}</td>
                      <td><span className="badge badge-primary">{b.packageType}</span></td>
                      <td>{b.washingPoint}</td>
                      <td>{b.washDate}</td>
                      <td>
                        <Link to={`/booking/edit/${b._id}`} className="btn btn-ghost btn-sm" id={`admin-edit-${b._id}`}>
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
