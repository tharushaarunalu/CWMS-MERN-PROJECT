import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import WashingPlans from './pages/WashingPlans';
import WashingPoints from './pages/WashingPoints';
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Nav />
            <Suspense fallback={<div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-muted)' }}>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/plans" element={<WashingPlans />} />
                    <Route path="/washing-points" element={<WashingPoints />} />
                    <Route path="/booking/add" element={<AddBooking />} />
                    <Route path="/booking/edit/:id" element={<EditBooking />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
};

export default App;
