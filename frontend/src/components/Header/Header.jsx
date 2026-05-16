// Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculate days remaining for badge (30 days from now)
  const [daysLeft, setDaysLeft] = useState(30);
  // Smooth scroll to newsletter section
  const scrollToWaitlist = (e) => {
    e.preventDefault();
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu(); // close mobile menu if open
    }
  };
  
  useEffect(() => {
    const targetDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
    const updateDays = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
      } else {
        setDaysLeft(0);
      }
    };
    updateDays();
    const interval = setInterval(updateDays, 86400000); // update daily
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={`luxury-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo / Brand */}
         <div className="logo">
          <div className="logo-icon"><img src={logo} alt="M&K Leathers Logo" width={100} height={100}/></div>
          <div className="logo-text">
            <span className="logo-main" style={{fontSize:'30px'}}>M&K</span>
            <span className="logo-sub">LEATHERS</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#collection" className="nav-link">Collection</a></li>
            <li><a href="#craftsmanship" className="nav-link">Craftsmanship</a></li>
            <li><a href="#journal" className="nav-link">Journal</a></li>
            <li><a href="#waitlist" className="nav-link waitlist-btn" onClick={scrollToWaitlist}>
              Join Waitlist
            </a></li>
          </ul>
        </nav>

        {/* Countdown Badge + Right Icons */}
        <div className="header-right">
          <div className="countdown-badge">
            <span className="badge-icon">⏳</span>
            <span className="badge-text">{daysLeft} DAYS TO LAUNCH</span>
          </div>
          <div className="icon-group">
            <button className="icon-btn search-icon" aria-label="Search"></button>
            <button className="icon-btn user-icon" aria-label="Account"></button>
          </div>
          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;