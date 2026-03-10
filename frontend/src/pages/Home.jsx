import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import SearchForm from '../components/SearchForm';
import './Home.css';

/* ── Service Data ── */
const services = [
  {
    icon: '✨',
    title: 'Express Wash',
    desc: 'Quick exterior clean in under 15 minutes. Perfect for daily maintenance.',
    color: 'var(--clr-primary)',
  },
  {
    icon: '🪣',
    title: 'Full Detail',
    desc: 'Complete interior & exterior detailing for a showroom-fresh finish.',
    color: 'var(--clr-accent)',
  },
  {
    icon: '🛡️',
    title: 'Ceramic Coat',
    desc: 'Long-lasting nano-ceramic protection that repels water & UV damage.',
    color: 'var(--clr-gold)',
  },
  {
    icon: '🔧',
    title: 'Engine Clean',
    desc: 'Safe and thorough engine bay degreasing and cleaning.',
    color: 'hsl(155, 70%, 55%)',
  },
];

/* ── Stats ── */
const stats = [
  { value: '10K+', label: 'Cars Washed' },
  { value: '50+', label: 'Locations' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '5 Min', label: 'Avg Wait Time' },
];

/* ── Plans ── */
const plans = [
  {
    name: 'Basic',
    price: 'LKR 800',
    color: 'var(--clr-primary)',
    features: ['Exterior Rinse', 'Window Wipe', 'Tyre Shine'],
    popular: false,
  },
  {
    name: 'Premium',
    price: 'LKR 1,800',
    color: 'var(--clr-accent)',
    features: ['Full Exterior Wash', 'Interior Vacuum', 'Dashboard Polish', 'Window Cleaning'],
    popular: true,
  },
  {
    name: 'Ultimate',
    price: 'LKR 3,500',
    color: 'var(--clr-gold)',
    features: ['Complete Detail', 'Ceramic Coating', 'Engine Clean', 'Fragrance Treatment', 'Paint Protection'],
    popular: false,
  },
];

const Home = () => {
  return (
    <main className="home">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>

        <div className="hero__overlay" aria-hidden="true" />

        <div className="hero__content container anim-fade-up">
          <div className="section-label anim-fade-up">🏆 Sri Lanka's #1 Car Wash Platform</div>
          <h1 className="hero__title">
            Your Car Deserves<br />
            <span className="gradient-text">The Best Care</span>
          </h1>
          <p className="hero__subtitle">
            Book premium car washing services at any of our 50+ locations.
            Fast, reliable, and sparkly clean — every time.
          </p>
          <div className="hero__actions anim-fade-up anim-fade-up-delay-2">
            <Link to="/booking/add" className="btn btn-primary hero__btn">
              🚗 Book a Wash
            </Link>
            <Link to="/plans" className="btn btn-ghost hero__btn">
              View Plans →
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero__stats anim-fade-up anim-fade-up-delay-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-value gradient-text">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ── SEARCH BAR ─────────────────────────────────── */}
      <section className="home__search-bar container">
        <SearchForm />
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section className="home-section container" aria-labelledby="services-heading">
        <div className="home-section__header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title" id="services-heading">
            Premium <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            From express rinses to full ceramic coatings — we have a service for every need.
          </p>
          <div className="glow-divider" />
        </div>

        <div className="services-grid">
          {services.map(({ icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`service-card glass-card anim-fade-up anim-fade-up-delay-${i + 1}`}
              style={{ '--card-color': color }}
            >
              <div className="service-card__icon">{icon}</div>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{desc}</p>
              <Link to="/booking/add" className="service-card__cta">
                Book Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS ──────────────────────────────────────── */}
      <section className="home-plans" aria-labelledby="plans-heading">
        <div className="container">
          <div className="home-section__header">
            <span className="section-label">Pricing</span>
            <h2 className="section-title" id="plans-heading">
              Simple, <span className="gradient-text">Transparent</span> Plans
            </h2>
            <p className="section-subtitle">No hidden fees — just a clean car.</p>
            <div className="glow-divider" />
          </div>

          <div className="plans-grid">
            {plans.map(({ name, price, features, popular, color }) => (
              <div
                key={name}
                className={`plan-card glass-card ${popular ? 'plan-card--popular' : ''}`}
                style={{ '--plan-color': color }}
              >
                {popular && <div className="plan-card__badge">Most Popular</div>}
                <h3 className="plan-card__name">{name}</h3>
                <div className="plan-card__price">{price}</div>
                <ul className="plan-card__features">
                  {features.map((f) => (
                    <li key={f}>
                      <span aria-hidden="true">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/booking/add" className="btn btn-primary plan-card__btn">
                  Choose {name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section className="home-cta container">
        <div className="home-cta__card glass-card">
          <div className="home-cta__bg" aria-hidden="true" />
          <div className="home-cta__content">
            <h2 className="home-cta__title">
              Ready for a <span className="gradient-text">Sparkling Clean</span> Ride?
            </h2>
            <p className="home-cta__sub">
              Book your appointment in under 60 seconds. No queues, no stress.
            </p>
            <Link to="/booking/add" className="btn btn-primary">
              🚗 Book Now — It's Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
