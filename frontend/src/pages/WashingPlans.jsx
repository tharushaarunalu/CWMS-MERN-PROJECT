import React from 'react';
import { Link } from 'react-router-dom';
import './WashingPlans.css';

const plans = [
  {
    name: 'Express',
    price: 'LKR 800',
    duration: '15 min',
    color: 'var(--clr-primary)',
    features: [
      'Exterior rinse & wash',
      'Wheel & tyre clean',
      'Window wipe',
      'Air freshener',
    ],
  },
  {
    name: 'Standard',
    price: 'LKR 1,200',
    duration: '30 min',
    color: 'hsl(155, 70%, 55%)',
    popular: false,
    features: [
      'Everything in Express',
      'Interior vacuum',
      'Dashboard wipe',
      'Door jam clean',
    ],
  },
  {
    name: 'Premium',
    price: 'LKR 1,800',
    duration: '45 min',
    color: 'var(--clr-accent)',
    popular: true,
    features: [
      'Everything in Standard',
      'Full interior detail',
      'Seat shampooing',
      'Window polish',
      'Tyre dressing',
    ],
  },
  {
    name: 'Ultimate',
    price: 'LKR 3,500',
    duration: '90 min',
    color: 'var(--clr-gold)',
    features: [
      'Everything in Premium',
      'Engine bay clean',
      'Clay bar treatment',
      'Ceramic spray coat',
      'Paint protection film',
      'Fragrance treatment',
    ],
  },
];

const WashingPlans = () => {
  return (
    <main className="page-wrapper plans-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Pricing</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            Washing <span className="gradient-text">Plans</span>
          </h1>
          <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
            Transparent pricing. No hidden fees. Just a spotless vehicle.
          </p>
          <div className="glow-divider" />
        </div>
      </section>

      <section className="container plans-grid-wrap">
        <div className="plans-big-grid">
          {plans.map(({ name, price, duration, features, popular, color }, i) => (
            <div
              key={name}
              className={`plans-big-card glass-card anim-fade-up anim-fade-up-delay-${i + 1} ${popular ? 'plans-big-card--popular' : ''}`}
              style={{ '--plan-color': color }}
            >
              {popular && <div className="plans-big-card__badge">⭐ Most Popular</div>}

              <div className="plans-big-card__header">
                <h2 className="plans-big-card__name">{name}</h2>
                <span className="plans-big-card__duration">⏱ {duration}</span>
              </div>

              <div className="plans-big-card__price">{price}</div>

              <ul className="plans-big-card__features">
                {features.map((f) => (
                  <li key={f}><span aria-hidden="true" className="plans-big-card__check">✓</span> {f}</li>
                ))}
              </ul>

              <Link
                to="/booking/add"
                className="btn btn-primary plans-big-card__cta"
                id={`book-plan-${name.toLowerCase()}`}
              >
                Book {name}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="plans-faq glass-card">
          <h2 className="plans-faq__title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="plans-faq__list">
            {[
              { q: 'How long does a wash take?', a: 'Depending on the plan, 15 to 90 minutes.' },
              { q: 'Do I need to be present?', a: 'No — drop off your car and we\'ll notify you when it\'s ready.' },
              { q: 'Are products eco-friendly?', a: 'Yes! We use biodegradable, water-saving products.' },
              { q: 'Can I cancel or reschedule?', a: 'Yes, up to 2 hours before your appointment at no cost.' },
            ].map(({ q, a }) => (
              <div key={q} className="plans-faq__item">
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default WashingPlans;
