// Footer.jsx
import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="luxury-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="logo-icon"><img src={logo} alt="" width={100} height={100} /></div>
            <div className="logo-text">
              <span className="logo-main">M&K</span>
              <span className="logo-sub">LEATHERS</span>
            </div>
          </div>
          <p className="footer-description">
            Handcrafted leather goods that stand the test of time. 
            Each piece tells a story of tradition, quality, and passion.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/m_and_k_leathers?igsh=ZzN0bHg4aWVldmJ2" className="social-icon instagram" aria-label="Instagram"></a>
            <a href="#" className="social-icon facebook" aria-label="Facebook"></a>
            <a href="#" className="social-icon pinterest" aria-label="Pinterest"></a>
            <a href="#" className="social-icon twitter" aria-label="Twitter"></a>
          </div>
        </div>

        {/* Quick Links Columns */}
        <div className="footer-col">
          <h4>Collections</h4>
          <ul>
            <li><a href="#">Heritage Bags</a></li>
            <li><a href="#">Artisan Jackets</a></li>
            <li><a href="#">Fine Accessories</a></li>
            <li><a href="#">Limited Edition</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Leather Care</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Craftsmanship</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Journal</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h4>Join the Legacy</h4>
          <p>Be first to know about new arrivals, exclusive offers, and the launch.</p>
          <form onSubmit={handleSubscribe} className="footer-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && <p className="subscribe-success">✓ Thanks for subscribing!</p>}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2025 Heritage Leather. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;