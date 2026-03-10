import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './AddBooking.css'; /* shared form styles */

const packageTypes = ['Express Wash', 'Full Detail', 'Ceramic Coat', 'Engine Clean'];
const washingPoints = ['Colombo 07', 'Kandy City', 'Galle Road', 'Negombo', 'Kurunegala'];

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => setForm(data))
      .catch(() => setStatus('load-error'));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setTimeout(() => navigate('/search'), 2000);
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'load-error') {
    return (
      <main className="page-wrapper">
        <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
          <p className="alert alert-error">Could not load booking. <Link to="/search">Go back</Link></p>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="page-wrapper">
        <div className="container" style={{ paddingTop: '8rem', textAlign: 'center', color: 'var(--clr-text-muted)' }}>
          Loading booking…
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper booking-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Update Reservation</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Edit <span className="gradient-text">Booking</span>
          </h1>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="container booking-form-wrap">
        <div className="booking-form-card glass-card anim-fade-up">
          {status === 'success' && <div className="alert alert-success">✅ Booking updated! Redirecting…</div>}
          {status === 'error' && <div className="alert alert-error">❌ Update failed. Please try again.</div>}

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="booking-form__section">
              <h3 className="booking-form__section-title">📦 Service Details</h3>
              <div className="booking-form__grid">
                <div className="form-group">
                  <label htmlFor="edit-packageType" className="form-label">Package Type</label>
                  <select id="edit-packageType" name="packageType" className="form-select" value={form.packageType || ''} onChange={handleChange} required>
                    <option value="">Select package…</option>
                    {packageTypes.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="edit-washingPoint" className="form-label">Washing Point</label>
                  <select id="edit-washingPoint" name="washingPoint" className="form-select" value={form.washingPoint || ''} onChange={handleChange} required>
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
                  <label htmlFor="edit-fullName" className="form-label">Full Name</label>
                  <input id="edit-fullName" name="fullName" type="text" className="form-input" value={form.fullName || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-mobileNo" className="form-label">Mobile Number</label>
                  <input id="edit-mobileNo" name="mobileNo" type="tel" className="form-input" value={form.mobileNo || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-vehicleNo" className="form-label">Vehicle Number</label>
                  <input id="edit-vehicleNo" name="vehicleNo" type="text" className="form-input" value={form.vehicleNo || ''} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="booking-form__section">
              <h3 className="booking-form__section-title">📅 Schedule</h3>
              <div className="booking-form__grid">
                <div className="form-group">
                  <label htmlFor="edit-washDate" className="form-label">Wash Date</label>
                  <input id="edit-washDate" name="washDate" type="date" className="form-input" value={form.washDate || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-washTime" className="form-label">Preferred Time</label>
                  <input id="edit-washTime" name="washTime" type="time" className="form-input" value={form.washTime || ''} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-message" className="form-label">Special Instructions</label>
              <textarea id="edit-message" name="message" className="form-textarea" value={form.message || ''} onChange={handleChange} />
            </div>

            <div className="booking-form__actions">
              <Link to="/search" className="btn btn-ghost">← Back</Link>
              <button type="submit" className="btn btn-primary" id="update-booking-btn" disabled={loading}>
                {loading ? '⏳ Saving…' : '💾 Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditBooking;
