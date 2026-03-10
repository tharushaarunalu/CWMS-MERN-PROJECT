import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const milestones = [
  { year: '2018', title: 'Founded', desc: 'CWMS launched its first washing point in Colombo.' },
  { year: '2020', title: 'Expanded', desc: 'Grew to 20 locations across 5 districts.' },
  { year: '2022', title: 'Digital Launch', desc: 'Introduced online booking and management platform.' },
  { year: '2024', title: '10K Milestone', desc: 'Proudly served over 10,000 happy customers.' },
];

const team = [
  { name: 'Ashan Perera', role: 'CEO & Founder', emoji: '👨‍💼' },
  { name: 'Tharushi Arunalu', role: 'CTO', emoji: '👩‍💻' },
  { name: 'Nimesh Karunarathna', role: 'Operations Manager', emoji: '👨‍🔧' },
  { name: 'Dilani Jayasekara', role: 'Customer Success', emoji: '👩‍🎓' },
];

const About = () => {
  return (
    <main className="page-wrapper about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label anim-fade-up">Our Story</span>
          <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
            About <span className="gradient-text">CWMS</span>
          </h1>
          <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
            We're on a mission to make professional car care accessible, fast, and affordable for every Sri Lankan.
          </p>
          <div className="glow-divider" />
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission container">
        <div className="about-mission__grid">
          <div className="about-mission__text anim-fade-up">
            <span className="section-label">Mission</span>
            <h2 className="section-title">Why We <span className="gradient-text">Exist</span></h2>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              We started CWMS because we believed car owners deserved more than grimy buckets and unreliable services.
              Our platform connects you to professionally-trained staff, top-grade equipment, and a booking system that
              respects your time.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
              <div className="about-value glass-card">
                <span>🎯</span>
                <strong>Precision</strong>
                <p>Every detail matters.</p>
              </div>
              <div className="about-value glass-card">
                <span>💚</span>
                <strong>Eco-Friendly</strong>
                <p>Water-saving techniques.</p>
              </div>
              <div className="about-value glass-card">
                <span>⚡</span>
                <strong>Speed</strong>
                <p>Faster than you expect.</p>
              </div>
            </div>
          </div>

          <div className="about-mission__visual anim-fade-up anim-fade-up-delay-2">
            <div className="about-glow-card glass-card">
              <div className="about-glow-card__icon anim-float">💧</div>
              <div className="about-glow-card__stats">
                <div><span className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>10K+</span><p>Cars Washed</p></div>
                <div><span className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>50+</span><p>Locations</p></div>
                <div><span className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>98%</span><p>Satisfaction</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <div className="home-section__header" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span className="section-label">Journey</span>
            <h2 className="section-title">Our <span className="gradient-text">Milestones</span></h2>
          </div>
          <div className="timeline">
            {milestones.map(({ year, title, desc }, i) => (
              <div key={year} className={`timeline__item anim-fade-up anim-fade-up-delay-${i + 1}`}>
                <div className="timeline__dot" />
                <div className="timeline__card glass-card">
                  <span className="timeline__year">{year}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="section-label">People</span>
          <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
          <div className="glow-divider" />
        </div>
        <div className="team-grid">
          {team.map(({ name, role, emoji }, i) => (
            <div key={name} className={`team-card glass-card anim-fade-up anim-fade-up-delay-${i + 1}`}>
              <div className="team-card__avatar">{emoji}</div>
              <h3 className="team-card__name">{name}</h3>
              <p className="team-card__role">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta container">
        <div className="glass-card about-cta__card">
          <h2>Ready to Experience the <span className="gradient-text">Difference?</span></h2>
          <p>Book your first wash today and see why thousands trust CWMS.</p>
          <Link to="/booking/add" className="btn btn-primary">Get Started →</Link>
        </div>
      </section>
    </main>
  );
};

export default About;
