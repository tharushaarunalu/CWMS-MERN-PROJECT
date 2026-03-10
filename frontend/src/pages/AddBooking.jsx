import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddBooking.css';

const packageTypes = ['Express Wash', 'Full Detail', 'Ceramic Coat', 'Engine Clean'];
const washingPoints = ['Colombo 07', 'Kandy City', 'Galle Road', 'Negombo', 'Kurunegala'];

const AddBooking = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    packageType: '',
    washingPoint: '',
    fullName: '',
    mobileNo: '',
    vehicleNo: '',
    washDate: '',
    washTime: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setTimeout(() => navigate('/search'), 2000);
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-wrapper booking-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">New Reservation</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Book a <span className="gradient-text">Wash</span>
          </h1>
          <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
            Choose your package, pick a time, and we'll handle the rest.
          </p>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="container booking-form-wrap">
        <div className="booking-form-card glass-card anim-fade-up">
          {status === 'success' && <div className="alert alert-success">✅ Booking confirmed! Redirecting…</div>}
          {status === 'error' && <div className="alert alert-error">❌ Failed to submit. Please try again.</div>}

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="booking-form__section">
              <h3 className="booking-form__section-title">📦 Service Details</h3>
              <div className="booking-form__grid">
                <div className="form-group">
                  <label htmlFor="packageType" className="form-label">Package Type</label>
                  <select id="packageType" name="packageType" className="form-select" value={form.packageType} onChange={handleChange} required>
                    <option value="">Select package…</option>
                    {packageTypes.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="washingPoint" className="form-label">Washing Point</label>
                  <select id="washingPoint" name="washingPoint" className="form-select" value={form.washingPoint} onChange={handleChange} required>
                    <option value="">Select location…</option>
                    {washingPoints.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="booking-form__section">
              <h3 className="booking-form__section-title">👤 Personal Info</h3>
              <div className="booking-form__grid">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input id="fullName" name="fullName" type="text" className="form-input" placeholder="Your full name" value={form.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                  <input id="mobileNo" name="mobileNo" type="tel" className="form-input" placeholder="07X XXX XXXX" value={form.mobileNo} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleNo" className="form-label">Vehicle Number</label>
                  <input id="vehicleNo" name="vehicleNo" type="text" className="form-input" placeholder="WP ABC-1234" value={form.vehicleNo} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="booking-form__section">
              <h3 className="booking-form__section-title">📅 Schedule</h3>
              <div className="booking-form__grid">
                <div className="form-group">
                  <label htmlFor="washDate" className="form-label">Wash Date</label>
                  <input id="washDate" name="washDate" type="date" className="form-input" value={form.washDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="form-group">
                  <label htmlFor="washTime" className="form-label">Preferred Time</label>
                  <input id="washTime" name="washTime" type="time" className="form-input" value={form.washTime} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Special Instructions (Optional)</label>
              <textarea id="message" name="message" className="form-textarea" placeholder="Any specific requests or notes…" value={form.message} onChange={handleChange} />
            </div>

            <div className="booking-form__actions">
              <Link to="/" className="btn btn-ghost">← Cancel</Link>
              <button type="submit" className="btn btn-primary" id="submit-booking-btn" disabled={loading}>
                {loading ? '⏳ Submitting…' : '✅ Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddBooking;
