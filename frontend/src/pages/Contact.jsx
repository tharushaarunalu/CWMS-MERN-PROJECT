import React, { useState } from 'react';
import './Contact.css';

const contactMethods = [
  { icon: '📞', label: 'Phone', value: '+94 77 123 4567', href: 'tel:+94771234567' },
  { icon: '📧', label: 'Email', value: 'info@cwms.lk', href: 'mailto:info@cwms.lk' },
  { icon: '📍', label: 'Address', value: '123 Wash Street, Colombo 07', href: '#' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat, 7am–7pm', href: '#' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <main className="page-wrapper contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Get in Touch</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
            Questions, feedback, or partnership ideas? We'd love to hear from you.
          </p>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="contact-body container">
        {/* Contact Method Cards */}
        <div className="contact-methods anim-fade-up">
          {contactMethods.map(({ icon, label, value, href }) => (
            <a key={label} href={href} className="contact-method glass-card">
              <span className="contact-method__icon">{icon}</span>
              <div>
                <p className="contact-method__label">{label}</p>
                <p className="contact-method__value">{value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="contact-form-wrap glass-card anim-fade-up anim-fade-up-delay-2">
          <h2 className="contact-form-wrap__title">
            Send a <span className="gradient-text">Message</span>
          </h2>

          {status === 'success' && (
            <div className="alert alert-success">✅ Message sent! We'll get back to you within 24 hours.</div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="form-input"
                placeholder="How can we help?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell us more..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary contact-form__submit" id="contact-submit-btn">
              📨 Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
