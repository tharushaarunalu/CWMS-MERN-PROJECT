import React from 'react';
import { Link } from 'react-router-dom';
import './WashingPoints.css';

const locations = [
    {
        id: 1,
        name: 'Colombo 07',
        address: '45 Ward Place, Colombo 07',
        phone: '+94 77 100 0001',
        hours: '7am – 7pm',
        services: ['Express', 'Standard', 'Premium', 'Ultimate'],
        rating: 4.9,
        mapUrl: '#',
    },
    {
        id: 2,
        name: 'Kandy City',
        address: '12 Dalada Veediya, Kandy',
        phone: '+94 77 200 0002',
        hours: '7am – 6pm',
        services: ['Express', 'Standard', 'Premium'],
        rating: 4.8,
        mapUrl: '#',
    },
    {
        id: 3,
        name: 'Galle Road',
        address: '200 Galle Road, Dehiwala',
        phone: '+94 77 300 0003',
        hours: '8am – 7pm',
        services: ['Express', 'Standard', 'Premium', 'Ultimate'],
        rating: 4.7,
        mapUrl: '#',
    },
    {
        id: 4,
        name: 'Negombo',
        address: '5 Lewis Place, Negombo',
        phone: '+94 77 400 0004',
        hours: '7am – 6pm',
        services: ['Express', 'Standard'],
        rating: 4.6,
        mapUrl: '#',
    },
    {
        id: 5,
        name: 'Kurunegala',
        address: '88 Colombo Road, Kurunegala',
        phone: '+94 77 500 0005',
        hours: '7am – 7pm',
        services: ['Express', 'Standard', 'Premium'],
        rating: 4.8,
        mapUrl: '#',
    },
    {
        id: 6,
        name: 'Jaffna Point',
        address: '23 Hospital Road, Jaffna',
        phone: '+94 77 600 0006',
        hours: '8am – 6pm',
        services: ['Express', 'Standard'],
        rating: 4.7,
        mapUrl: '#',
    },
];

const WashingPoints = () => {
    return (
        <main className="page-wrapper points-page">
            <section className="page-hero">
                <div className="container">
                    <span className="section-label anim-fade-up">Find Us</span>
                    <h1 className="page-title anim-fade-up anim-fade-up-delay-1">
                        Washing <span className="gradient-text">Locations</span>
                    </h1>
                    <p className="page-subtitle anim-fade-up anim-fade-up-delay-2">
                        With 50+ locations island-wide, there's always a CWMS point near you.
                    </p>
                    <div className="glow-divider" />
                </div>
            </section>

            <section className="container points-body">
                <div className="points-grid">
                    {locations.map(({ id, name, address, phone, hours, services, rating, mapUrl }, i) => (
                        <div
                            key={id}
                            className={`point-card glass-card anim-fade-up anim-fade-up-delay-${(i % 5) + 1}`}
                        >
                            <div className="point-card__header">
                                <div>
                                    <h3 className="point-card__name">📍 {name}</h3>
                                    <p className="point-card__address">{address}</p>
                                </div>
                                <div className="point-card__rating">
                                    <span className="point-card__stars">★</span>
                                    <span>{rating}</span>
                                </div>
                            </div>

                            <div className="point-card__meta">
                                <span>📞 {phone}</span>
                                <span>🕐 {hours}</span>
                            </div>

                            <div className="point-card__services">
                                {services.map((s) => (
                                    <span key={s} className="badge badge-primary">{s}</span>
                                ))}
                            </div>

                            <div className="point-card__actions">
                                <a href={mapUrl} className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer" id={`map-btn-${id}`}>
                                    🗺 Directions
                                </a>
                                <Link to="/booking/add" className="btn btn-primary btn-sm" id={`book-point-${id}`}>
                                    Book Here
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default WashingPoints;
